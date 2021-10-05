"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataBase = void 0;
const sequelize_1 = require("sequelize");
exports.DataBase = new sequelize_1.Sequelize({
    dialect: 'sqlite',
    storage: 'Fruit-Shop.db'
});
//# sourceMappingURL=database.js.map