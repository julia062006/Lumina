import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import Pedido from "./Pedido";
import Usuario from "./Usuario";
import FormaPagamento from "./FormaPagamento";

class Pagamento extends Model {
    public id_pagamento!: number;
    public id_pedido!: number;
    public id_usuario!: number;
    public id_forma_pagamento!: number;
    public status_pagamento!: string;
    public data_pagamento!: Date;
}

Pagamento.init({
    id_pagamento: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    id_pedido: {
       type: DataTypes.INTEGER,
       allowNull: false,
       references: {
        model: "pedido",
        key: "id_pedido"
       }
    },
    id_usuario: {
       type: DataTypes.INTEGER,
       allowNull: false,
       references: {
        model: "usuario",
        key: "id_usuario"
       }
    },
    id_forma_pagamento: {
       type: DataTypes.INTEGER,
       allowNull: false,
       references: {
        model: "forma_pagamento",
        key: "id_forma_pagamento"
       }
    },
    status_pagamento: {
        type: DataTypes.STRING,
        allowNull: false
    },
    data_pagamento: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    sequelize,
    tableName: "pagamento"
})

Pedido.hasMany(Pagamento, { foreignKey: "id_pedido", as: "pagamentos" });
Pagamento.belongsTo(Pedido, { foreignKey: "id_pedido", as: "pedido" });

Usuario.hasMany(Pagamento, { foreignKey: "id_usuario", as: "pagamentos" });
Pagamento.belongsTo(Usuario, { foreignKey: "id_usuario", as: "usuario" });

FormaPagamento.hasMany(Pagamento, { foreignKey: "id_forma_pagamento", as: "pagamentos" });
Pagamento.belongsTo(FormaPagamento, { foreignKey: "id_forma_pagamento", as: "forma_pagamento" });

export default Pagamento;