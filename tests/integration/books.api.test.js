import request from "supertest";
import app from "../../src/app.js";
import { sequelize } from "../../src/models/index.js";

describe("Book APi", () => {
  beforeAll(async () => {
    if (process.env.NODE_ENV !== "test") {
      throw new Error("Tests must run in test environment");
    }

    await sequelize.sync({ force: true });
  });
  afterAll(async () => {
    await sequelize.close();
  });

  describe("POST /api/books", () => {
    test("add book in catalogue", async()=>{
        
    })
  });
});