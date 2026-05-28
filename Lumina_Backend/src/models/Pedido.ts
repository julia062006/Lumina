import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import Usuario from "./Usuario";

class Pedido extends Model {
    public id_pedido!: number;
    public id_usuario!: number;
    public data_pedido!: Date;
    public valor_total!: number;
    public status!: string;
}

Pedido.init({
    id_pedido: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    id_usuario: {
       type: DataTypes.INTEGER,
       allowNull: false,
       references: {
        model: "usuario",
        key: "id_usuario"
       }
    },
    data_pedido: {
        type: DataTypes.DATE,
        allowNull: false
    },
    valor_total: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    tableName: "pedido"
})

Usuario.hasMany(Pedido, {foreignKey: 'id_usuario', as: 'pedidos'});
Pedido.belongsTo(Usuario, {foreignKey: 'id_usuario', as: 'usuario'});

export default Pedido;