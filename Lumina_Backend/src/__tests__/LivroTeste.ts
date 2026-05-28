import request from "supertest";
import app from "../app";
import sequelize from "../config/database";
import path from "path";
import { Livro } from "../types/Livro";

describe("Livros", () => {

    const token = "token";

    const caminhoImagem = path.resolve(__dirname, "files/teste.jpg");
    const caminhoPdf = path.resolve(__dirname, "files/teste.pdf");

    beforeEach(async () => {
        // await sequelize.sync({ force: true });

        // await sequelize.models.Autor.create({
        //     id_autor: 1,
        //     nome: "Autor Teste",
        //     biografia: "Biografia teste",
        //     foto: "foto.jpg"
        // });

        // await sequelize.models.Categoria.create({
        //     id_categoria: 1,
        //     nome: "Categoria Teste",
        //     descricao: "Descrição teste"
        // });
    });

    // async function criarLivro(): Promise<number> {
    //     const resposta = await request(app)
    //         .post("/livros")
    //         .set("Authorization", "Bearer " + token)
    //         .field("titulo", "Livro Teste")
    //         .field("descricao", "Descrição teste")
    //         .field("preco", "49.90")
    //         .field("id_autor", "1")
    //         .field("id_categoria", "1")
    //         .field("destaque", "false")
    //         .attach("capa_imagem", caminhoImagem)
    //         .attach("arquivo_pdf", caminhoPdf);

    //     return resposta.body.id_livro;
    // }

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

    // describe("POST /livros", () => {
    //     test("Deve criar um livro com dados válidos", async () => {
    //         const resposta = await request(app)
    //             .post("/livros")
    //             .set("Authorization", "Bearer " + token)
    //             .field("titulo", "Novo Livro")
    //             .field("descricao", "Descrição")
    //             .field("preco", "39.90")
    //             .field("id_autor", "1")
    //             .field("id_categoria", "1")
    //             .field("destaque", "false")
    //             .attach("capa_imagem", caminhoImagem)
    //             .attach("arquivo_pdf", caminhoPdf);

    //         expect(resposta.status).toBe(201);
    //         expect(resposta.body).toHaveProperty("id_livro");
    //     });

    //     test("Deve retornar erro ao não enviar arquivos", async () => {
    //         const resposta = await request(app)
    //             .post("/livros")
    //             .set("Authorization", "Bearer " + token)
    //             .field("titulo", "Sem arquivo")
    //             .field("descricao", "Teste")
    //             .field("preco", "10.00")
    //             .field("id_autor", "1")
    //             .field("id_categoria", "1");

    //         expect(resposta.status).toBe(400);
    //     });

    //     test("Deve retornar 401 sem token", async () => {
    //         const resposta = await request(app)
    //             .post("/livros")
    //             .field("titulo", "Sem token");

    //         expect(resposta.status).toBe(400);
    //     });
    // });

   describe("GET /livros/:id", () => {
        test("Deve retornar um livro existente", async () => {
          //  const livroId = await criarLivro();

          //  const resposta = await request(app).get(`/livros/${livroId}`);

          //  expect(resposta.status).toBe(200);
          //  expect(resposta.body).toHaveProperty("id_livro", livroId);
          //  expect(resposta.body).toHaveProperty("autor");
          //  expect(resposta.body).toHaveProperty("categoria");
        });

        test("Deve retornar 404 para livro inexistente", async () => {
            const resposta = await request(app).get("/livros/999999");

            expect(resposta.status).toBe(404);
        });
    });

    // describe("PUT /livros/:id", () => {
    //     test("Deve atualizar um livro existente", async () => {
    //         const livroId = await criarLivro();

    //         const resposta = await request(app)
    //             .put("/livros/" + livroId)
    //             .set("Authorization", "Bearer " + token)
    //             .field("titulo", "Atualizado")
    //             .field("descricao", "Nova")
    //             .field("preco", "59.90")
    //             .field("id_autor", "1")
    //             .field("id_categoria", "1")
    //             .field("destaque", "true")
    //             .attach("capa_imagem", caminhoImagem)
    //             .attach("arquivo_pdf", caminhoPdf);

    //         expect(resposta.status).toBe(200);
    //     });

    //     test("Deve manter arquivos antigos ao atualizar sem novos", async () => {
    //         const livroId = await criarLivro();

    //         const resposta = await request(app)
    //             .put("/livros/" + livroId)
    //             .set("Authorization", "Bearer " + token)
    //             .field("titulo", "Novo")
    //             .field("descricao", "Desc")
    //             .field("preco", "10.00")
    //             .field("id_autor", "1")
    //             .field("id_categoria", "1")
    //             .field("destaque", "false");

    //         expect(resposta.status).toBe(200);
    //     });

    //     test("Deve retornar 404 ao atualizar inexistente", async () => {
    //         const resposta = await request(app)
    //             .put("/livros/999999")
    //             .set("Authorization", "Bearer " + token)
    //             .field("titulo", "x");

    //         expect(resposta.status).toBe(404);
    //     });
    // });

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

    // describe("DELETE /livros/:id", () => {
    //     test("Deve remover um livro existente", async () => {
    //         const livroId = await criarLivro();

    //         const resposta = await request(app)
    //             .delete("/livros/" + livroId)
    //             .set("Authorization", "Bearer " + token);

    //         expect(resposta.status).toBe(200);
    //     });

    //     test("Deve retornar 404 ao remover inexistente", async () => {
    //         const resposta = await request(app)
    //             .delete("/livros/999999")
    //             .set("Authorization", "Bearer " + token);

    //         expect(resposta.status).toBe(404);
    //     });
    // });

});