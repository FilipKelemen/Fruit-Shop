"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = express_1.default();
// Sequelize Database
const database_1 = require("./config/database");
try {
    database_1.DataBase.authenticate();
    // tslint:disable-next-line:no-console
    console.log('Connection has been established successfully.');
}
catch (error) {
    // tslint:disable-next-line:no-console
    console.error('Unable to connect to the database:', error);
}
// routes
const cartRoute_1 = require("./routes/cartRoute/cartRoute");
const productsRoute_1 = require("./routes/productsRoute");
const usersRoute_1 = require("./routes/usersRoute");
app.use('/cartRoute', cartRoute_1.cartRoute);
app.use('/productsRoute', productsRoute_1.productsRoute);
app.use('/usersRoute', usersRoute_1.usersRoute);
// Updating a product
// app.put('/put',(req:any,res:any) => {
//   const productFound = products.find((product: any) => product.id === parseInt(req.params.id));
//   if(productFound === undefined) res.status(400).json({msg : `product with id ${req.params.id} not found.`});
//   else{
//     const updatedproduct = req.body;
//       productFound.name = updatedproduct.name ? updatedproduct.name : productFound.name;
//       productFound.email = updatedproduct.email ? updatedproduct.email : productFound.email;
//       res.json({msg : `product with id ${productFound.id} modified:`, productFound});
//   }
// });
// Making server run
const PORT = process.env.PORT || 3000;
// tslint:disable-next-line:no-console
app.listen(PORT, () => console.log(`Express API is running at port ${PORT}`));
//# sourceMappingURL=index.js.map