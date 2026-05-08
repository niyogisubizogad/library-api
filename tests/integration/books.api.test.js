import { beforeAll, describe, expect, jest } from "@jest/globals";
import request from "supertest";
import app from "../../src/app.js";
import { sequelize } from "../../src/models/index.js";

describe("Book API", () => {
  beforeAll(async () => {
    if (process.env.NODE_ENV !== "test") {
      throw new Error("Tests must run in test environment");
    }
    await sequelize.sync({ force: true });
  }, 30000);

  afterAll(async () => {
    await sequelize.close();
  });

  let bookId;
  describe("POST /api/books", () => {
    test("add book in catalogue", async () => {
      const res = await request(app).post("/api/books").send({
        title: "Clean Code",
        author: "Robert C. Martin",
        isbn: "9780132350884",
        genre: "Programming",
        totalCopies: 7,
      });

      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toHaveProperty("id");

      bookId = res.body.data.id; 
    });
  });

  describe("GET /api/books/", () => {
    test("return all books stored in catalogue", async () => {
      const res = await request(app).get("/api/books");

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(Array.isArray(res.body.data)).toBe(true);
    });
  });


  describe("PUT /api/books/:id", () => {
    test("update book author", async () => {
      const res = await request(app)
        .put(`/api/books/${bookId}`)
        .send({ author: "James Clear" });

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.author).toBe("James Clear");
    }, 15000);
  });

  describe("DELETE /api/books/:id", () => {
    test("delete book", async () => {
      const res = await request(app).delete(`/api/books/${bookId}`);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);

      const check = await request(app).get(`/api/books/${bookId}`);
      expect(check.status).toBe(404);
    }, 15000);
  });
});
