// The cart will be a protected route nad only users can use it.
import express from 'express';
import { CartRequestEntryDTO } from '../../../../src/app/models/models';
import { Address, Cart, CartEntry, DeliveryService, Product } from '../../../api-models/databaseModel';
// passport config
import passport from 'passport';
import  passportCallback from '../../config/passport';
import { asyncWrapper } from '../../function modules/asyncWrapper';
import { Op } from 'sequelize';
passportCallback(passport);
// routes
const cartRoute = express.Router();
import  { billingAddressRoute }  from '../cartRoute/routes/billingAddress';
import  { deliveryAddressRoute }  from '../cartRoute/routes/deliveryAddress';
import  { deliveryServiceRoute }  from '../cartRoute/routes/deliveryService';
import  { paymentRoute }  from '../cartRoute/routes/payment';

cartRoute.use('/billingAddressRoute',billingAddressRoute);
cartRoute.use('/deliveryAddressRoute',deliveryAddressRoute);
cartRoute.use('/deliveryServiceRoute',deliveryServiceRoute);
cartRoute.use('/paymentRoute',paymentRoute);
// make express see the body and make it a json
cartRoute.use(express.urlencoded({ extended: false }));
cartRoute.use(express.json());

cartRoute
.route('/')
.get(passport.authenticate('jwt', { session: false}),
    asyncWrapper( async (req:express.Request,res:express.Response, next: any) => {
      const userFromRequest:any = req.user; // The passport library can't read req.user.email because the types are broken so i have to capy the user in another variable
      const cart :any = await Cart.findOne({
        where: { cart_id: userFromRequest.cart_id},
        include: [{
          model: CartEntry,
          include: {
            model: Product
          } as any
        },{
          model: Address,
        },{
          model: DeliveryService
        }],});
    res.status(200).json(cart);
}))
.post(passport.authenticate('jwt', { session: false }),
     asyncWrapper(async (req:express.Request,res:express.Response,next: any) => {
  const userFromRequest:any = req.user; // The passport library can't read req.user.email because the types are broken so i have to capy the user in another variable
  // creating the blueprint of the entry I will send
  const newCartEntry: CartRequestEntryDTO = {
    "product_id": req.body.product_id,
    "quantity": req.body.quantity,
  };
  if(newCartEntry.product_id==null || newCartEntry.quantity==null ){
    res.status(400).json({succes: false});
  }else{
    // checking if an entry in the same cart with the same product exists
    const existingProduct = await CartEntry.findOne({ where:{ [Op.and]:[
      { product_id: newCartEntry.product_id},
      {cart_id: userFromRequest.cart_id}
    ]}});
    // checking if the product exists nad the quantity is ok
    const foundProduct = await Product.findOne({ where: { product_id: newCartEntry.product_id } });
    // The if checks if there is no entry with the same product in the cart, if the product exists and if the quantity is ok
    if( !existingProduct &&
        foundProduct &&
        newCartEntry.quantity>=1 &&
        Number.isInteger(newCartEntry.quantity) ){
      // creating a new cart entry record
      await CartEntry.create({quantity: newCartEntry.quantity, cart_id: userFromRequest.cart_id, product_id: newCartEntry.product_id});
      // changing the total and formatted total
      const cart :any = await Cart.findOne({
        where: { cart_id: userFromRequest.cart_id},
        include: [{
          model: CartEntry,
          include: {
            model: Product
          } as any
        },{
          model: Address
        },{
          model: DeliveryService
        }],});
      let newTotal: number = cart.getDataValue('total');
      newTotal+= foundProduct.getDataValue('price').value;
      const newFormattedTotal: string = '$' + newTotal;
      cart.total = newTotal;
      cart.formatted_total = newFormattedTotal;
      // updating the DB
      await Cart.update({total: newTotal, formatted_total: newFormattedTotal},{
        where: {
          cart_id: userFromRequest.cart_id
        }
      })
      // sending the cart back to the frontend with the values modified
      res.status(200).json(cart);
    } else
      res.status(400).json({succes: false});
  }
}));
cartRoute
.route('/products/:product_id')
.delete(passport.authenticate('jwt', { session: false}),
    asyncWrapper(async (req:express.Request,res:express.Response,next: any) => {
      const userFromRequest:any = req.user; // The passport library can't read req.user.email because the types are broken so i have to capy the user in another variable
      if(req.params.product_id===null ){
        res.status(400).json({succes: false});
      }else{
      // checking if an entry in the same cart with the same product exists
      const existingProduct = await CartEntry.findOne({ where:{ [Op.and]:[
      { product_id: req.params.product_id},
      {cart_id: userFromRequest.cart_id}
      ]}});
      // The if checks if there is an entry with this product in cart
      if( existingProduct ){
        // finding only the entry that I need
        let cart :any = await Cart.findOne({
          where: { cart_id: userFromRequest.cart_id},
          include: {
            where: {product_id: req.params.product_id},
            model: CartEntry,
            include: {
              model: Product
            } as any
          },
        });
        // changing the total and formatted total
        let newTotal: number = cart.total;
        // going in the cart returned from the Db to the values I need
        newTotal-= (cart.cart_entries[0].product.price.value)*(cart.getDataValue('cart_entries')[0].quantity);
        const newFormattedTotal: string = '$' + newTotal;
        // deleting the entry
        cart.cart_entries[0].destroy();
        // updating the DB
        await Cart.update({total: newTotal, formatted_total: newFormattedTotal},{
          where: {
            cart_id: userFromRequest.cart_id
          }
        });
        // fetching the new cart from the database
        cart = await Cart.findOne({
          where: { cart_id: userFromRequest.cart_id},
          include: [{
            model: CartEntry,
            include: {
              model: Product
            } as any
          },{
            model: Address
          },{
            model: DeliveryService
          }],});
        // sending the cart back to the frontend with the values modified
        res.status(200).json(cart);
      } else
      res.status(400).json({succes: false});
      }
}))
.patch(passport.authenticate('jwt', {session: false}),
  asyncWrapper(async (req: express.Request,res: express.Response,next: any) => {
    const userFromRequest:any = req.user;
    if(req.params.product_id == null || req.body.quantity == null)
      res.status(400).json({succes: false});
    else {
      // checking if an entry in the same cart with the same product exists
      const existingProduct = await CartEntry.findOne({ where:{ [Op.and]:[
        { product_id: req.params.product_id},
        {cart_id: userFromRequest.cart_id}
        ]}});
         // The if checks if there is an entry with this product in cart
        if( existingProduct ){
          let cart :any = await Cart.findOne({ // Only retrieving the entry from the cart with this product (entries return as an array)
            where: { cart_id: userFromRequest.cart_id},
            include: {
              where: {product_id: req.params.product_id},
              model: CartEntry,
              include: {
                model: Product
              } as any
            },
          });
          // changing the total and formatted total
          let newTotal: number = cart.total;
          // Checking if the quantity has changed by one and updating the total in the api
          if(req.body.quantity === cart.cart_entries[0].quantity-1 && req.body.quantity >= 1){ // Substracting one from quantity
            newTotal-= cart.cart_entries[0].product.price.value;
          }
          if(req.body.quantity === cart.cart_entries[0].quantity+1 && req.body.quantity<= cart.cart_entries[0].product.number_in_stock){ // Adding to quantity
            newTotal+= cart.cart_entries[0].product.price.value;
          }
          // If a change has occured I am changing the value in the DataBase
          if(newTotal !== cart.total){
            const newFormattedTotal: string = '$' + newTotal;
            await CartEntry.update({quantity: req.body.quantity},{
              where: {
                cart_entry_id: cart.cart_entries[0].cart_entry_id
              }
            })
            // updating total in DB
            await Cart.update({total: newTotal, formatted_total: newFormattedTotal},{
              where: {
                cart_id: userFromRequest.cart_id
              }
            });
            // fetching the new cart from the database
            cart = await Cart.findOne({
              where: { cart_id: userFromRequest.cart_id},
              include: [{
                model: CartEntry,
                include: {
                  model: Product
                } as any
              },{
                model: Address
              },{
                model: DeliveryService
              }],});
            // sending the cart back to the frontend with the values modified
            res.status(200).json(cart);
          } else{
            // It failed because there are no more items in stock
            if(req.body.quantity === cart.cart_entries[0].quantity+1){
              res.status(400).json({succes: false, reason: "Out of stock"})
            }
            res.status(500).json({succes: false});
          }
        }
    }
  }))


export {cartRoute};