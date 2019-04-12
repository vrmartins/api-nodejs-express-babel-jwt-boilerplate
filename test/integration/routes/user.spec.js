/* eslint-disable no-undef */

import faker from "faker";
import UserModel from "../../../server/models/user";

let defaultUser = {
  name: faker.name.firstName(),
  email: faker.internet.email(),
  password: faker.internet.password()
};

describe("User endpoints", () => {

  before(async () => {
    await UserModel.deleteMany({});
  });

  describe("GET /user", () => {
    it("should return get params", () => {
      request
        .get("/api/user?param1=xyz")
        .expect(200)
        .end((err, res) => {
          let expected = {param1: "xyz"};
          expect(res.body).to.eql(expected);
        });
      expect(1).to.eql(1);
    });
  });

  describe("POST /user", () => {
    it("should return get params", () => {
      request
        .post("/api/user")
        .send(defaultUser)
        .expect(201)
        .end((err, res) => {
          let expected = {...defaultUser, _id: res.body._id, __v: 0};
          expect(res.body).to.eql(expected);
          // done(err);
        });
    });
    it.only("should return status 500", () => {
      request
        .post("/api/user")
        .send({...defaultUser, name: ""})
        .expect(200)
        .end((err, res) => {
          expect(res.body)
            .to.have.property("error")
            .to.have.property("errors")
            .to.have.property("name");
        });
    });
  });

  after(async () => {
    await UserModel.deleteMany({});
  });
});