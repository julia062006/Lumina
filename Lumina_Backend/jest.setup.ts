process.env.NODE_ENV = "test";

import sequelize from "./src/config/database";

beforeAll(async () => {
  try {
    await sequelize.sync({ force: true });
    console.log("Banco de teste iniciado");
  } catch (error) {
    console.error("Erro ao iniciar banco de teste:", error);
  }
});

afterAll(async () => {
  await sequelize.close();
});