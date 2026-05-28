import request from "supertest";
import app from "../app";
import sequelize from "../config/database";

describe("Usuários", () => {

    beforeEach(async () => {
        // await sequelize.sync({ force: true });
    });

    // async function criarUsuario() {
    //     return await request(app)
    //         .post("/usuarios")
    //         .send({
    //             nome: "Teste",
    //             email: "teste@email.com",
    //             senha: "Teste@123",
    //             confirmarSenha: "Teste@123",
    //             cpf: "52998224725"
    //         });
    // }

    // describe("POST /usuarios", () => {

    //     test("Deve criar um usuário válido", async () => {
    //         const resposta = await criarUsuario();

    //         expect(resposta.status).toBe(201);
    //         expect(resposta.body).toHaveProperty("id");
    //     });

    //     test("Deve retornar erro ao enviar dados inválidos", async () => {
    //         const resposta = await request(app)
    //             .post("/usuarios")
    //             .send({});

    //         expect(resposta.status).toBe(400);
    //     });

    // });

    // describe("GET /usuarios", () => {

    //     test("Deve listar usuários", async () => {
    //         await criarUsuario();

    //         const resposta = await request(app).get("/usuarios");

    //         expect(resposta.status).toBe(200);
    //         expect(Array.isArray(resposta.body)).toBe(true);
    //     });

    // });

    describe("GET /usuarios/:id", () => {

        test("Deve retornar usuário existente", async () => {
          //  const user = await criarUsuario();

         //   const resposta = await request(app)
         //       .get(`/usuarios/${user.body.id}`);

         //   expect(resposta.status).toBe(200);
        });

        test("Deve retornar 404 para inexistente", async () => {
            const resposta = await request(app)
                .get("/usuarios/999");

            expect(resposta.status).toBe(404);
        });

    });

    // describe("PUT /usuarios/:id", () => {

    //     test("Deve atualizar usuário", async () => {
    //         const user = await criarUsuario();

    //         const resposta = await request(app)
    //             .put("/usuarios/" + user.body.id)
    //             .send({
    //                 nome: "Novo Nome",
    //                 cpf: "52998224725"
    //             });

    //         expect(resposta.status).toBe(200);
    //     });

    //     test("Deve retornar 404 ao atualizar inexistente", async () => {
    //         const resposta = await request(app)
    //             .put("/usuarios/999")
    //             .send({
    //                 nome: "Teste",
    //                 cpf: "52998224725"
    //             });

    //         expect(resposta.status).toBe(403);
    //     });

    // });

    // describe("DELETE /usuarios/:id", () => {

    //     test("Deve remover usuário", async () => {
    //         const user = await criarUsuario();

    //         const resposta = await request(app)
    //             .delete("/usuarios/" + user.body.id);

    //         expect(resposta.status).toBe(200);
    //     });

    //     test("Deve retornar 404 ao remover inexistente", async () => {
    //         const resposta = await request(app)
    //             .delete("/usuarios/999");

    //         expect(resposta.status).toBe(404);
    //     });

    // });

    // describe("POST /entrar", () => {

    //     test("Deve fazer login com dados válidos", async () => {
    //         await criarUsuario();

    //         const resposta = await request(app)
    //             .post("/entrar")
    //             .send({
    //                 email: "teste@email.com",
    //                 senha: "Teste@123"
    //             });

    //         expect(resposta.status).toBe(200);
    //         expect(resposta.body).toHaveProperty("token");
    //     });

    //     test("Deve retornar erro com senha inválida", async () => {
    //         await criarUsuario();

    //         const resposta = await request(app)
    //             .post("/entrar")
    //             .send({
    //                 email: "teste@email.com",
    //                 senha: "errada"
    //             });

    //         expect(resposta.status).toBe(401);
    //     });

    //     test("Deve retornar erro sem dados", async () => {
    //         const resposta = await request(app)
    //             .post("/entrar")
    //             .send({});

    //         expect(resposta.status).toBe(400);
    //     });

    // });

});