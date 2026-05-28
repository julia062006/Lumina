import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

class Autor extends Model {
    declare id_autor: number;
    declare nome: string;
    declare biografia: string;
    declare foto: string;
}

Autor.init({
    id_autor: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    biografia: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    foto: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    tableName: "autor"
})

export default Autor;