import request from "supertest";
import app from "../index-test";

//test case to get the posts
test("Should get posts", async () => {
  await request(app).get("/posts/").expect(200);
});
