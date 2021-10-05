"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeliveryService = exports.Address = exports.CartEntry = exports.Cart = exports.User = exports.Product = void 0;
const Sequelize = __importStar(require("sequelize"));
const sequelize_1 = __importDefault(require("sequelize"));
const database_1 = require("../src/config/database");
exports.Product = database_1.DataBase.define('product', {
    product_id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    colors: {
        type: Sequelize.JSON
    },
    number_in_stock: {
        type: Sequelize.INTEGER
    },
    name: {
        type: Sequelize.STRING(20)
    },
    image: {
        type: Sequelize.STRING(100)
    },
    price: {
        type: Sequelize.JSON
    },
    description: {
        type: Sequelize.STRING
    },
    createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.DataTypes.NOW
    },
    updatedAt: {
        type: Sequelize.DATE
    }
});
exports.User = database_1.DataBase.define('user', {
    user_id: {
        type: Sequelize.UUIDV4,
        defaultValue: Sequelize.UUIDV4,
        unique: true,
        allowNull: false,
        primaryKey: true
    },
    email: {
        type: Sequelize.TEXT,
        unique: true
    },
    password: {
        type: Sequelize.TEXT,
    },
    first_name: {
        type: Sequelize.TEXT,
    },
    last_name: {
        type: Sequelize.TEXT,
    },
    createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.DataTypes.NOW
    },
    updatedAt: {
        type: Sequelize.DATE
    },
    cart_id: {
        type: Sequelize.TEXT,
    }
}, {
    underscored: true
});
exports.Cart = database_1.DataBase.define('cart', {
    cart_id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    },
    total: {
        type: Sequelize.NUMBER,
        defaultValue: 0
    },
    formatted_total: {
        type: Sequelize.TEXT,
        defaultValue: '0$'
    },
    payment_method: {
        type: Sequelize.TEXT
    }
}, {
    timestamps: true
});
exports.CartEntry = database_1.DataBase.define('cart_entry', {
    cart_entry_id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    },
    quantity: {
        type: Sequelize.INTEGER,
    }
}, {
    timestamps: true
});
exports.Address = database_1.DataBase.define('address', {
    address_id: {
        type: sequelize_1.default.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        unique: true,
        allowNull: false
    },
    first_name: {
        type: sequelize_1.default.TEXT,
        allowNull: false
    },
    last_name: {
        type: sequelize_1.default.TEXT,
        allowNull: false
    },
    email: {
        type: sequelize_1.default.TEXT,
        unique: true,
        allowNull: false
    },
    phone_number: {
        type: sequelize_1.default.TEXT,
        allowNull: false
    },
    complete_street: {
        type: sequelize_1.default.TEXT,
        allowNull: false
    },
    country: {
        type: sequelize_1.default.TEXT,
        allowNull: false
    },
    county: {
        type: sequelize_1.default.TEXT,
        allowNull: false
    },
    city: {
        type: sequelize_1.default.TEXT,
        allowNull: false
    },
    postal_code: {
        type: sequelize_1.default.TEXT,
        allowNull: false
    },
    type: {
        type: sequelize_1.default.TEXT,
        allowNull: false
    },
    company: {
        type: sequelize_1.default.TEXT
    }
}, {
    timestamps: true
});
exports.DeliveryService = database_1.DataBase.define('delivery_service', {
    delivery_service_id: {
        type: Sequelize.UUIDV4,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        unique: true,
        allowNull: false
    },
    name: {
        type: Sequelize.TEXT,
        unique: true,
        allowNull: false
    }
}, {
    timestamps: true
});
// Associations
// cart 1 to 1 with user
exports.Cart.hasOne(exports.User, { foreignKey: { name: 'cart_id' } });
exports.User.belongsTo(exports.Cart, { foreignKey: { name: 'cart_id' } });
// cart 1 to many with cart_entries
exports.Cart.hasMany(exports.CartEntry, { foreignKey: { name: 'cart_id' } });
exports.CartEntry.belongsTo(exports.Cart, { foreignKey: { name: 'cart_id' } });
// product one to many with cart_entries
exports.Product.hasMany(exports.CartEntry, { foreignKey: { name: 'product_id' } });
exports.CartEntry.belongsTo(exports.Product, { foreignKey: { name: 'product_id' } });
// cart one to many addresses
exports.Address.hasOne(exports.Cart, { foreignKey: { name: 'cart_id' } });
exports.Cart.hasMany(exports.Address, { foreignKey: { name: 'cart_id' } });
// user one to many addresses
exports.Address.hasOne(exports.User, { foreignKey: { name: 'user_id' } });
exports.User.hasMany(exports.Address, { foreignKey: { name: 'user_id' } });
// delivery service 1 to many cart
exports.DeliveryService.hasMany(exports.Cart, { foreignKey: { name: 'delivery_service_id' } });
exports.Cart.belongsTo(exports.DeliveryService, { foreignKey: { name: 'delivery_service_id' } });
//# sourceMappingURL=databaseModel.js.map