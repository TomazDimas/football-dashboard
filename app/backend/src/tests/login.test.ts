import * as sinon from "sinon";
import * as chai from "chai";
// @ts-ignore
import chaiHttp = require("chai-http");

import { app } from "../app";

chai.use(chaiHttp);

const { expect } = chai;

describe("o endpoint /login no back-end de maneira que ele permita o acesso com dados válidos no front-end", async () => {
  it("teste /login", async () => {
    const mockLogin = {
      email: "admin@admin.com",
      password: "secret_admin",
    };
    const mockResponse = {
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsInBhc3N3b3JkIjoiJDJhJDEwJEQ4MEhpUzFRNk9xTnltMW15TzZIUk9oL3pLektlYnY0Y2ZiL2Z1QjhFVE5GU1k0Um8zb0xTIiwiaWF0IjoxNjY2OTAyOTcxfQ.qvE4F8d6VguUiksUfY8YKwjtJxR_XWaT8l3LyHFkg_8",
    };
    const httpResponse = await chai.request(app).post("/login").send(mockLogin);
    expect(httpResponse.status).to.equal(200);
    expect(httpResponse.body).to.deep.equal(mockResponse);
  });
});
