import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

class Categoria extends Model {
    declare id_categoria: number;
    declare nome: string;
    declare descricao: string;
}

Categoria.init({
    id_categoria: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descricao: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    destaque: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
}, {
    sequelize,
    tableName: "categoria"
})

export default Categoria;