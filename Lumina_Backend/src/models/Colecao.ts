import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

class Colecao extends Model {
    declare id_colecao: number;
    declare nome: string;
    declare descricao: string;
}

Colecao.init({
    id_colecao: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descricao: {
        type: DataTypes.TEXT,
        allowNull: false
    }  
},{
    sequelize,
    tableName: "colecao"
})

export default Colecao;