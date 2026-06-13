import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

class Editora extends Model {
    declare id_editora: number;
    declare nome: string;
    declare descricao: string;
}

Editora.init({
    id_editora: {
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
    tableName: "editora"
})

export default Editora;