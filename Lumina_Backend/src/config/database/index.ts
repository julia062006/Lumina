import { Sequelize } from "sequelize";

const isTest = process.env.NODE_ENV === "test";

const sequelize = isTest
  ? new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
    })
  : new Sequelize(
      "lumina",
      "root",
      "",
      {
        host: "localhost",
        port: 3306,
        dialect: "mysql",
        logging: false,
      }
    );

export default sequelize;