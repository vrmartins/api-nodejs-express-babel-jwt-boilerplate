/* eslint-disable no-undef */

import assert from "assert";

describe("New test", () => {
  describe("GET /user", () => {
    it("should return get params", async () => {
      request
        .get("/api/user?param1=xyz")
        .expect(200)
        .end((err, res) => {
          let expected = {param1: "xyz"};
          expect(res.body).to.eql(expected);
          // done(err);
        });
      assert.equal([1, 2, 3].indexOf(4), -1);
    });
  });
});