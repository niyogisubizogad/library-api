// tests/integration/loan.api.test.js
import { describe, beforeAll, afterAll, test, expect } from "@jest/globals";
import request from "supertest";
import app from "../../src/app.js";
import { sequelize } from "../../src/models/index.js";

describe("Loan API", () => {
  let userId;
  let bookId;
  let loanId;
  let token;

  beforeAll(async () => {
    if (process.env.NODE_ENV !== "test") {
      throw new Error("Tests must run in test environment");
    }

    await sequelize.sync({ force: true });

    const userRes = await request(app)
    .post("/api/users/register").send({
        name: "Uwimana Aline",
        email: "uwimana@gmail.com",
        password: "aline@123",
    });
    const loginRes = await request(app)
    .post("/api/users/login")
    .send({  email: "uwimana@gmail.com", password: "aline@123",})
    userId = userRes.body.data.id;

    const bookRes = await request(app).post("/api/books").send({
        title: "Clean Code",
        author: "Robert C. Martin",
        isbn: "9780132350884",
        genre: "Programming",
        totalCopies: 7,
    });
    token = loginRes.body.data.token;
    bookId = bookRes.body.data.id;
  }, 30000);

  afterAll(async () => {
    await sequelize.close();
  });

  describe("POST /api/loans", () => {
    test(" create a new loan", async () => {
      const res = await request(app)
        .post("/api/loans")
        .set("Authorization", `Bearer ${token}`)
        .send({
          userId,
          bookId,
          dueDate: new Date().toISOString(),
        });

      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toHaveProperty("id");

      loanId = res.body.data.id;
    }, 20000);
  });

  describe("PATCH /api/loans/:id/return", () => {
    test("return the book to catalogue", async () => {
      const res = await request(app)
      .patch(`/api/loans/${loanId}/return`)
      .set("Authorization", `Bearer ${token}`)


      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.returnedAt).not.toBeNull();
    }, 15000);
  });

  describe("GET /api/loans/user/:userId", () => {
    test("return 200 and borrowing history of User", async () => {
      const res = await request(app)
      .get(`/api/loans/user/${userId}`)
      .set("Authorization", `Bearer ${token}`)

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(Array.isArray(res.body.data)).toBe(true);

    }, 15000);
  });
});    