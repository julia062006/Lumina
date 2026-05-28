import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

class FormaPagamento extends Model {
    public id_forma_pagamento!: number;
    public tipo!: string
}

FormaPagamento.init({
    id_forma_pagamento: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    tipo: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
}, {
    sequelize,
    tableName: "forma_pagamento"
})

export default FormaPagamento;