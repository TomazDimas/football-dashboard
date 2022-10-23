import * as sinon from "sinon";
import * as chai from "chai";
// @ts-ignore
import chaiHttp = require("chai-http");

import { app } from "../app";

chai.use(chaiHttp);

const { expect } = chai;

describe("o endpoint /login no back-end de maneira que ele permita o acesso com dados válidos no front-end", async () => {
  it("Seu sub-teste", async () => {
    const mockLogin = {
      email: "teste@email.com",
      password: "senha123",
    };
    const mockResponse = {
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjU0NTI3MTg5fQ.XS_9AA82iNoiVaASi0NtJpqOQ_gHSHhxrpIdigiT-fc",
    };
    const httpResponse = await chai.request(app).post("/login").send(mockLogin);
    expect(httpResponse.status).to.equal(200);
    expect(httpResponse.body).to.deep.equal(mockResponse);
  });
});
