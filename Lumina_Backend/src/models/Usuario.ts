import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

class Usuario extends Model {
    declare id_usuario: number;
    declare nome: string;
    declare email: string;
    declare senha: string;
    declare cpf: string;
}

Usuario.init({
    id_usuario: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: 'unique_email'
    },
    senha: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cpf: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: 'unique_cpf'
    },
}, {
    sequelize,
    tableName: "usuario"
})

export default Usuario;
