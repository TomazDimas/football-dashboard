import * as sinon from "sinon";
import * as chai from "chai";
// @ts-ignore
import chaiHttp = require("chai-http");

import { app } from "../app";

chai.use(chaiHttp);

const { expect } = chai;

describe("o endpoint /teams e /teams:id retornam suas devidas funcionalidades", async () => {
  it("teste /teams", async () => {
    const mockResponse = [
      {
        "id": 1,
        "teamName": "Avaí/Kindermann"
      },
      {
        "id": 2,
        "teamName": "Bahia"
      },
      {
        "id": 3,
        "teamName": "Botafogo"
      },
      {
        "id": 4,
        "teamName": "Corinthians"
      },
      {
        "id": 5,
        "teamName": "Cruzeiro"
      },
      {
        "id": 6,
        "teamName": "Ferroviária"
      },
      {
        "id": 7,
        "teamName": "Flamengo"
      },
      {
        "id": 8,
        "teamName": "Grêmio"
      },
      {
        "id": 9,
        "teamName": "Internacional"
      },
      {
        "id": 10,
        "teamName": "Minas Brasília"
      },
      {
        "id": 11,
        "teamName": "Napoli-SC"
      },
      {
        "id": 12,
        "teamName": "Palmeiras"
      },
      {
        "id": 13,
        "teamName": "Real Brasília"
      },
      {
        "id": 14,
        "teamName": "Santos"
      },
      {
        "id": 15,
        "teamName": "São José-SP"
      },
      {
        "id": 16,
        "teamName": "São Paulo"
      }
    ]
    const httpResponse = await chai.request(app).get("/teams");
    expect(httpResponse.status).to.equal(200);
    expect(httpResponse.body).to.deep.equal(mockResponse);
  });

  it("teste /teams/:id", async () => {
    const mockResponse = {
      "id": 2,
      "teamName": "Bahia"
    }
    const httpResponse = await chai.request(app).get("/teams/2");
    expect(httpResponse.status).to.equal(200);
    expect(httpResponse.body).to.deep.equal(mockResponse);
  });
});
