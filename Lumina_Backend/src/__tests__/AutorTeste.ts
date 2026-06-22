import request from "supertest";
import app from "../app";
import sequelize from "../config/database";
import path from "path";

describe("Autores", () => {

    const token = "token";
    const caminhoImagem = path.resolve(__dirname, "files/teste.jpg");


    describe("GET /autores", () => {
        test("Deve listar todos os autores", async () => {
            const resposta = await request(app).get("/autores");

            expect(resposta.status).toBe(200);
            expect(Array.isArray(resposta.body)).toBe(true);
        });
    });

    describe("GET /autores/:id", () => {
        test("Deve retornar um autor existente", async () => {
            const resposta = await request(app).get("/autores/1");

        });

        test("Deve retornar 404 para autor inexistente", async () => {
            const resposta = await request(app).get("/autores/999");

            expect(resposta.status).toBe(404);
        });
    });

    describe("GET /autores/:id/livros", () => {
        test("Deve retornar livros do autor", async () => {

            const resposta = await request(app).get("/autores/1/livros");

            expect(resposta.status).toBe(200);
            expect(Array.isArray(resposta.body)).toBe(true);
        });
    });


    describe("DELETE /autores/:id", () => {
        test("Deve remover um autor existente", async () => {
            const resposta = await request(app)
                .delete("/autores/1")
                .set("Authorization", "Bearer " + token);

        });

        test("Deve retornar 404 ao remover inexistente", async () => {
            const resposta = await request(app)
                .delete("/autores/999")
                .set("Authorization", "Bearer " + token);

            expect(resposta.status).toBe(404);
        });
    });

});