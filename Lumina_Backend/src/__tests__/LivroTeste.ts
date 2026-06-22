import request from "supertest";
import app from "../app";
import sequelize from "../config/database";
import path from "path";
import { Livro } from "../types/Livro";

describe("Livros", () => {

    const token = "token";

    const caminhoImagem = path.resolve(__dirname, "files/teste.jpg");
    const caminhoPdf = path.resolve(__dirname, "files/teste.pdf");

    describe("GET /livros", () => {
        test("Deve listar todos os livros", async () => {
            const resposta = await request(app).get("/livros");

            expect(resposta.status).toBe(200);
            expect(Array.isArray(resposta.body)).toBe(true);
        });

        test("Deve filtrar livros por categoria", async () => {
            const resposta = await request(app).get("/livros?categoria=1");

            expect(resposta.status).toBe(200);
            expect(Array.isArray(resposta.body)).toBe(true);

            resposta.body.forEach((livro: Livro) => {
                expect(livro.id_categoria).toBe(1);
            });
        });
    });

   describe("GET /livros/:id", () => {
    
        test("Deve retornar 404 para livro inexistente", async () => {
            const resposta = await request(app).get("/livros/999999");

            expect(resposta.status).toBe(404);
        });
    });

    describe("GET /livros/destaque", () => {
        test("Deve retornar apenas livros com destaque true", async () => {
            const resposta = await request(app).get("/livros/destaque");

            expect(resposta.status).toBe(200);
            expect(Array.isArray(resposta.body)).toBe(true);

            resposta.body.forEach((livro: Livro) => {
                expect(livro.destaque).toBe(true);
            });
        });
    });

});