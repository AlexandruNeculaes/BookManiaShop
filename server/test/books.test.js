import request from "supertest";
import app from "../index-test";

//test case to get the books
test("Should get books", async () => {
  await request(app).get("/books/").expect(200);
});
