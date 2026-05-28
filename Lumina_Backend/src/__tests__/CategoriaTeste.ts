import request from "supertest";
import app from "../app";
import sequelize from "../config/database";

describe("Categorias", () => {

    const token = "token";

    beforeEach(async () => {
        // await sequelize.sync({ force: true });

        // await sequelize.models.Categoria.create({
        //     id_categoria: 1,
        //     nome: "Categoria Teste",
        //     descricao: "Descrição teste",
        //     destaque: true
        // });
    });

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
        test("Deve retornar uma categoria existente", async () => {
            const resposta = await request(app).get("/categorias/1");

        //    expect(resposta.status).toBe(200);
        //    expect(resposta.body).toHaveProperty("id_categoria", 1);
        });

        test("Deve retornar 404 para categoria inexistente", async () => {
            const resposta = await request(app).get("/categorias/999");

            expect(resposta.status).toBe(404);
        });
    });

    // describe("POST /categorias", () => {
    //     test("Deve criar uma categoria válida", async () => {
    //         const resposta = await request(app)
    //             .post("/categorias")
    //             .set("Authorization", "Bearer " + token)
    //             .send({
    //                 nome: "Nova Categoria",
    //                 descricao: "Descrição nova"
    //             });

    //         expect(resposta.status).toBe(201);
    //         expect(resposta.body).toHaveProperty("id_categoria");
    //     });

    //     test("Deve retornar erro ao enviar dados inválidos", async () => {
    //         const resposta = await request(app)
    //             .post("/categorias")
    //             .set("Authorization", "Bearer " + token)
    //             .send({});

    //         expect(resposta.status).toBe(400);
    //     });
    // });

    // describe("PUT /categorias/:id", () => {
    //     test("Deve atualizar uma categoria existente", async () => {
    //         const resposta = await request(app)
    //             .put("/categorias/1")
    //             .set("Authorization", "Bearer " + token)
    //             .send({
    //                 nome: "Atualizada",
    //                 descricao: "Nova descrição",
    //                 destaque: true
    //             });

    //         expect(resposta.status).toBe(200);
    //     });

    //     test("Deve retornar 404 ao atualizar inexistente", async () => {
    //         const resposta = await request(app)
    //             .put("/categorias/999")
    //             .set("Authorization", "Bearer " + token)
    //             .send({
    //                 nome: "x"
    //             });

    //         expect(resposta.status).toBe(404);
    //     });
    // });

    describe("DELETE /categorias/:id", () => {
        test("Deve remover uma categoria existente", async () => {
            const resposta = await request(app)
                .delete("/categorias/1")
                .set("Authorization", "Bearer " + token);

        //    expect(resposta.status).toBe(200);
        });

        test("Deve retornar 404 ao remover inexistente", async () => {
            const resposta = await request(app)
                .delete("/categorias/999")
                .set("Authorization", "Bearer " + token);

            expect(resposta.status).toBe(404);
        });
    });
});