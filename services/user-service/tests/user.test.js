// tests/user.test.js
const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../src/server"); // Ensure server exports Express app

beforeAll(async () => {
  // Connect to in-memory or test MongoDB
  const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/user_test_db";
  await mongoose.connect(MONGO_URI);
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

describe("User Service API", () => {
  let token;

  it("should register a new user", async () => {
    const res = await request(app)
      .post("/api/v1/auth/register")
      .send({ username: "testuser", email: "test@example.com", password: "pass123" });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("id");
  });

  it("should login user and return JWT", async () => {
    const res = await request(app)
      .post("/api/v1/auth/login")
      .send({ email: "test@example.com", password: "pass123" });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("token");
    token = res.body.token;
  });

  it("should get current user profile with JWT", async () => {
    const res = await request(app)
      .get("/api/v1/auth/me")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("email", "test@example.com");
  });

  it("should forbid access without JWT", async () => {
    const res = await request(app).get("/api/v1/auth/me");
    expect(res.statusCode).toBe(401);
  });
});
