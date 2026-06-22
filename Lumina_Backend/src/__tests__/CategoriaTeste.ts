import request from "supertest";
import app from "../app";
import sequelize from "../config/database";

describe("Categorias", () => {

    const token = "token";


    describe("GET /categorias", () => {
        test("Deve listar todas as categorias", async () => {
            const resposta = await request(app).get("/categorias");

            expect(resposta.status).toBe(200);
            expect(Array.isArray(resposta.body)).toBe(true);
        });
    });

    describe("GET /categorias/destaque", () => {
        test("Deve retornar categorias com destaque", async () => {
            const resposta = await request(app).get("/categorias/destaque");

            expect(resposta.status).toBe(200);
            expect(Array.isArray(resposta.body)).toBe(true);

            resposta.body.forEach((categoria:{ destaque: boolean }) => {
                expect(categoria.destaque).toBe(true);
            });
        });
    });

    describe("GET /categorias/:id", () => {

        test("Deve retornar 404 para categoria inexistente", async () => {
            const resposta = await request(app).get("/categorias/999");

            expect(resposta.status).toBe(404);
        });
    });
    
    describe("DELETE /categorias/:id", () => {
        test("Deve remover uma categoria existente", async () => {
            const resposta = await request(app)
                .delete("/categorias/1")
                .set("Authorization", "Bearer " + token);
        });

        test("Deve retornar 404 ao remover inexistente", async () => {
            const resposta = await request(app)
                .delete("/categorias/999")
                .set("Authorization", "Bearer " + token);

            expect(resposta.status).toBe(404);
        });
    });
});