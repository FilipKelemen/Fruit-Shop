import express from 'express';
import { asyncWrapper } from '../../src/function modules/asyncWrapper';
import { ProductDTO } from '../../../src/app/models/models';

import { Product } from '../../api-models/databaseModel'



const productsRoute = express.Router();
productsRoute.use(express.urlencoded({ extended: false })); // Both used to make POST see my request, otherwise it comes as undefined
productsRoute.use(express.json());

productsRoute
.route('/')
.get( asyncWrapper ( async (req: express.Request,res: express.Response,next : any) => {
  res.json(await Product.findAll());
}))
.post(asyncWrapper ( async (req:express.Request<ProductDTO>,res:express.Response) => {
  const newProduct: ProductDTO = {
      "product_id":req.body.product_id,
      "number_in_stock":req.body.number_in_stock,
      "colors":req.body.colors,
      "image": req.body.image,
      "price": req.body.price,
      "name":req.body.name,
      "description":req.body.description
  };
  if(newProduct.product_id==null || newProduct.image==null || newProduct.price == null || newProduct.name == null || newProduct.description==null){
    res.status(400).json({"msg": `No product with name found ${newProduct.name}.`})
  }else{
    // Insert into table
    await Product.create(newProduct);
    res.status(200).json({"msg": "Product succesfully added!"});
  }
}));

// productsRoute
// .route('/:id')
// .get((req:express.Request<ProductRequestDTO>,res:express.Response) => {
//   const productFound = products.find((product) => product.product_id === Number(req.params.product_id));
//   if(productFound===undefined) res.status(400).json({msg: `No product with the id of ${req.params.product_id}`});
//   else res.json(productFound);
// });

export { productsRoute };