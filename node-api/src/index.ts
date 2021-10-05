
import express from 'express';
const app = express();

// Sequelize Database
import { DataBase } from './config/database';
try {
  DataBase.authenticate();
  // tslint:disable-next-line:no-console
  console.log('Connection has been established successfully.');
} catch (error) {
  // tslint:disable-next-line:no-console
  console.error('Unable to connect to the database:', error);
}

// routes

import  { cartRoute }  from './routes/cartRoute/cartRoute';
import { productsRoute } from './routes/productsRoute';
import { usersRoute } from './routes/usersRoute';

app.use('/cartRoute',cartRoute);
app.use('/productsRoute',productsRoute);
app.use('/usersRoute',usersRoute);

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