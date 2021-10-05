import express from 'express';
// models I need
import { Cart } from '../../../../api-models/databaseModel';
// passport config
import passport from 'passport';
import  passportCallback from '../../../config/passport';
passportCallback(passport);
// function I made for the db calls
import { asyncWrapper } from '../../../function modules/asyncWrapper';
import { PaymentDTO } from './interfaces/interfaces';

const paymentRoute = express.Router();
 // Body parser and making the body a json
 paymentRoute.use(express.urlencoded({ extended: false }));
 paymentRoute.use(express.json());

paymentRoute
.route('/')
.patch(passport.authenticate('jwt', {session: false}),
asyncWrapper(async (req: express.Request,res: express.Response,next: any) => {
  const userFromRequest:any = req.user; // passport bug, I need to do this to use the user
  // I didn't get all the parameters I need
  if( req.body.paymentMethod==='0' )
        res.status(400).json({succes: false, reason:"Not all the fields required are completed"});
  else {
    // If I'm here I got all the parameters
    const cart: any = await Cart.findOne({
      where: {
        cart_id: userFromRequest.cart_id
    }});
    // this is commented atm because I already look when attaching the billing and delivery address if the cart is null so it's too harsh on the api and reduntant
    // else {
    //   // If I'm here there is no other delivery address associated with the cart
    //   const atLeastOneEntry: any = await CartEntry.findOne({
    //     where: { cart_id: userFromRequest.cart_id}
    //   });
    //   // The cart has no entries
    //   if(!atLeastOneEntry)
    //     res.status(400).json({succes: false, reason: "This cart is empty"});
    // If I'm here the cart is not empty
    // creating the object
    const paymentObject: PaymentDTO = {
      payment_method: req.body.paymentMethod
    };
      await cart.update(paymentObject);
      res.status(200).json({msg: 'Succes, payment method patched!', paymentObject});
    }
  }));


export { paymentRoute };