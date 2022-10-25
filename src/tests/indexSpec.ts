import supertest from "supertest";
import app from "../app";

const request = supertest(app);



describe("Try opening main Endpoint ", () => {

    it("should return a status code 200", async (done) => {
      const response = await request.get("/image");
      expect(response.statusCode).toBe(200);
      done();
    });
});

describe("Show Available Images", () => {

  it("should return a status code 200", async (done) => {
    const response = await request.get("/image/showImages");
    expect(response.statusCode).toBe(200);
    done();
  });
});


describe("Try Resizing fjord Image", () => {

    it("should return a status code 200", async (done) => {
      const response = await request.get("/image/fjord/50/50");
      expect(response.statusCode).toBe(200);
      done();
    });
});


describe("Try getting false image file ", () => {

    it("should return a status code 404", async (done) => {
      const response = await request.get("/image/ahmed/50/50");
      expect(response.statusCode).toBe(304);
      done();
    });
});
