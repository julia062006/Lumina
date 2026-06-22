import request from "supertest";
import app from "../app";
import sequelize from "../config/database";

describe("Usuários", () => {


    describe("GET /usuarios/:id", () => {

        test("Deve retornar 404 para inexistente", async () => {
            const resposta = await request(app)
                .get("/usuarios/999");

            expect(resposta.status).toBe(404);
        });

    });

});