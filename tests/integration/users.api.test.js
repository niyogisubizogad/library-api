
import request from "supertest";

import app from "../../src/app.js";
import { sequelize } from "../../src/models/index.js";

describe("Users API", () => {
  beforeAll(async () => {
    if (process.env.NODE_ENV !== "test") {
      throw new Error("Tests must run in test environment");
    }

    await sequelize.sync({ force: true });

  });
  afterAll(async () => {
    await sequelize.close();
  });

  describe("POST api/user/register", () => {
    test("201 with user object on valid input", async () => {
      const res = await request(app).post("/api/users/register").send({
        name: "Uwimana Aline",
        email: "uwimana@gmail.com",
        password: "aline@123",
      });
      expect(res.status).toBe(201);
      expect(res.body.data.email).toBe("uwimana@gmail.com");
      expect(res.body.data).not.toHaveProperty("passwordHash");
    });
    test("return 400 when email is already registered", async () => {
   
      const res = await request(app).post("/api/users/register").send({
        name: "Nzakagenda Alexis",
        email: "uwimana@gmail.com",
        password: "alexis@321",
      });
      expect(res.status).toBe(409);
      expect(res.body.success).toBe(false);
    });
  });

  describe("POST /api/users/login", () => {
   

    test("return 200 with a token on valid credentials", async () => {
      const res = await request(app)
      .post("/api/users/login")
      .send({
        email: "uwimana@gmail.com",
        password: "aline@123",
      });
    
      expect(res.body.success).toBe(true);
      expect(res.status).toBe(200)
      expect(res.body.data).toHaveProperty("token");
    });

    test("return 401 when password or Email is wrong", async () => {
      const res = await request(app)
      .post("/api/users/login")
      .send({
        email: "uwiman@gmail.com",
        password: "aline@321",
      });
      expect(res.status).toBe(401);
      expect(res.body.success).toBe(false);
    });
  });
  describe("GET /api/users/:id", () => {
    beforeAll(async () => {
      await request(app)
      .post("/api/users/register")
      .send({
        name: "Ngirente Aline",
        email: "ngirente@gmail.com",
        password: "aline@321",
      });
    });

    test("return 200 with the user profile when a valid token is provided", async () => {
      const loginRes = await request(app)
        .post("/api/users/login")
        .send({ email: "ngirente@gmail.com", password: "aline@321" });
      const { id, token } = loginRes.body.data;

      const res = await request(app)
        .get(`/api/users/${id}`)
        .set("Authorization", `Bearer ${token}`);

      expect(res.body.success).toBe(true);
      expect(res.status).toBe(200);
      expect(res.body.data.password).toBeUndefined();
    });
  });
});
 