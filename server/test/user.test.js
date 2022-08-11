import request from "supertest";
import app from "../index-test";
import UserModal from "../models/user";

//test case to test by adding a new user
test("Should signup a new user", async () => {
  await UserModal.deleteMany();
  await request(app)
    .post("/user/signup")
    .send({
      email: "test@gmail.com",
      password: "test12345",
      firstName: "test12345",
      lastName: "test",
    })
    .expect(201);
});

//test case to login and exisitng user
test("Should login an exisitng user", async () => {
  await request(app)
    .post("/user/signin")
    .send({
      email: "test@gmail.com",
      password: "test12345",
    })
    .expect(200);
});

//test cases to check the login using invalid credentials
test("Should not login an exisitng user using invalid credentials", async () => {
  await request(app)
    .post("/user/signin")
    .send({
      email: "test@gmail.com",
      password: "admin23232",
    })
    .expect(400);
});
