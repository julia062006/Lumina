import { Sequelize } from "sequelize";

const isTest = process.env.NODE_ENV === "test";

const sequelize = isTest
  ? new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
    })
  : new Sequelize(
      process.env.DB_NAME ?? "lumina",
      process.env.DB_USER ?? "root",
      process.env.DB_PASS ?? "",
      {
        host: process.env.DB_HOST ?? "localhost",
        port: Number(process.env.DB_PORT ?? 3306),
        dialect: "mysql",
        logging: false,
      }
    );

export default sequelize;