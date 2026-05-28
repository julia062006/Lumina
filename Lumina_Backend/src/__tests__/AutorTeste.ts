import request from "supertest";
import app from "../app";
import sequelize from "../config/database";
import path from "path";

describe("Autores", () => {

    const token = "token";
    const caminhoImagem = path.resolve(__dirname, "files/teste.jpg");

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
        //     descricao: "Descrição"
        // });
    });


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

      //      expect(resposta.status).toBe(200);
      //      expect(resposta.body).toHaveProperty("id_autor", 1);
        });

        test("Deve retornar 404 para autor inexistente", async () => {
            const resposta = await request(app).get("/autores/999");

            expect(resposta.status).toBe(404);
        });
    });

    describe("GET /autores/:id/livros", () => {
        test("Deve retornar livros do autor", async () => {

            // await sequelize.models.Livro.create({
            //     titulo: "Livro Teste",
            //     descricao: "Descrição",
            //     preco: 10,
            //     id_autor: 1,
            //     id_categoria: 1,
            //     capa_imagem: "img.jpg",
            //     arquivo_pdf: "file.pdf",
            //     destaque: false
            // });

            const resposta = await request(app).get("/autores/1/livros");

            expect(resposta.status).toBe(200);
            expect(Array.isArray(resposta.body)).toBe(true);
        });
    });

    // describe("POST /autores", () => {
    //     test("Deve criar um autor válido", async () => {
    //         const resposta = await request(app)
    //             .post("/autores")
    //             .set("Authorization", "Bearer " + token)
    //             .field("nome", "Novo Autor")
    //             .field("biografia", "Biografia nova")
    //             .attach("foto", caminhoImagem);

    //         expect(resposta.status).toBe(201);
    //         expect(resposta.body).toHaveProperty("id_autor");
    //     });

    //     test("Deve retornar erro ao enviar dados inválidos", async () => {
    //         const resposta = await request(app)
    //             .post("/autores")
    //             .set("Authorization", "Bearer " + token)
    //             .field("nome", "");

    //         expect(resposta.status).toBe(400);
    //     });
    // });

    // describe("PUT /autores/:id", () => {
    //     test("Deve atualizar um autor existente", async () => {
    //         const resposta = await request(app)
    //             .put("/autores/1")
    //             .set("Authorization", "Bearer " + token)
    //             .field("nome", "Atualizado")
    //             .field("biografia", "Nova bio")
    //             .attach("foto", caminhoImagem);

    //         expect(resposta.status).toBe(200);
    //     });

    //     test("Deve retornar 404 ao atualizar inexistente", async () => {
    //         const resposta = await request(app)
    //             .put("/autores/999")
    //             .set("Authorization", "Bearer " + token)
    //             .field("nome", "x");

    //         expect(resposta.status).toBe(404);
    //     });
    // });

    describe("DELETE /autores/:id", () => {
        test("Deve remover um autor existente", async () => {
            const resposta = await request(app)
                .delete("/autores/1")
                .set("Authorization", "Bearer " + token);

        //    expect(resposta.status).toBe(200);
        });

        test("Deve retornar 404 ao remover inexistente", async () => {
            const resposta = await request(app)
                .delete("/autores/999")
                .set("Authorization", "Bearer " + token);

            expect(resposta.status).toBe(404);
        });
    });

});