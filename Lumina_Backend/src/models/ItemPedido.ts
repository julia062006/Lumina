import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import Pedido from "./Pedido";
import Livro from "./Livro";

class ItemPedido extends Model {
    public id_item!: number;
    public id_pedido!: number;
    public id_livro!: number;
    public preco_unitario!: number;
}

ItemPedido.init({
    id_item: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_pedido: {
       type: DataTypes.INTEGER,
       allowNull: false,
       references: {
        model: "pedido",
        key: "id_pedido"
       }
    },
    id_livro: {
       type: DataTypes.INTEGER,
       allowNull: false,
       references: {
        model: "livro",
        key: "id_livro"
       }
    },
    preco_unitario: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    }
}, {
    sequelize,
    tableName: "item_pedido"
})

Pedido.hasMany(ItemPedido, {foreignKey: 'id_pedido', as: 'itens'});
ItemPedido.belongsTo(Pedido, {foreignKey: 'id_pedido', as: 'pedido'});


Livro.hasMany(ItemPedido, {foreignKey: 'id_livro', as: 'itens'});
ItemPedido.belongsTo(Livro, {foreignKey: 'id_livro', as: 'livro'});


export default ItemPedido;