import express from 'express';
// models I need
import { Address, Cart, CartEntry, User } from '../../../../api-models/databaseModel';
import { POSTAddressDTO, PUTAddressDTO } from './interfaces/interfaces';
// passport config
import passport from 'passport';
import  passportCallback from '../../../config/passport';
passportCallback(passport);
// function I made for the db calls
import { asyncWrapper } from '../../../function modules/asyncWrapper';
import { Op } from 'sequelize';
import { create } from 'domain';

const deliveryAddressRoute = express.Router();
 // Body parser and making the body a json
 deliveryAddressRoute.use(express.urlencoded({ extended: false }));
 deliveryAddressRoute.use(express.json());

 deliveryAddressRoute
.route('/')
.post(passport.authenticate('jwt', {session: false}),
asyncWrapper(async (req: express.Request,res: express.Response,next: any) => {
  const userFromRequest:any = req.user; // passport bug, I need to do this to use the user
  // I didn't get all the parameters I need
  if( req.body.firstName===''         ||  req.body.lastName===''   ||
      req.body.email===''             ||  req.body.postalCode==='' ||
      req.body.phoneNumber===''       ||  req.body.country==='0'   ||
      req.body.completeStreet===''    ||  req.body.county==='0'    ||
      req.body.city==='0'             ||  req.params.address_id==='undefined')
        res.status(400).json({succes: false, reason:"Some of the fields required are not completed or the address is undefined"});
  else {
    // If I'm here I got all the parameters
    // Checking if the cart somehow has a delivery address already and the front end made a request to post by mistake
    const alreadyExistingDeliveryAddress: any = await Address.findOne({
      where: {[Op.and]:[
        {type: 'billing'},
        {cart_id: userFromRequest.cart_id}
      ] }
    });
    if( alreadyExistingDeliveryAddress ){
      res.status(400).json({succes: false, reason: "This cart has a delivery address already"});
    } else {
      // If I'm here there is no other delivery address associated with the cart
      const atLeastOneEntry: any = await CartEntry.findOne({
        where: { cart_id: userFromRequest.cart_id}
      });
      // The cart has no entries
      if(!atLeastOneEntry)
        res.status(400).json({succes: false, reason: "This cart is empty"});
      else {
        // If I'm here the cart is not empty
        // creating the object
        const deliveryAddressObject: POSTAddressDTO = {
          first_name: req.body.firstName,              last_name: req.body.lastName,
          email: req.body.email,                       postal_code: req.body.postalCode,
          phone_number: req.body.phoneNumber,          country: req.body.country,
          complete_street: req.body.completeStreet,    county: req.body.county,
          city: req.body.city,                         company: req.body.company,
          type:'delivery',                             cart_id: userFromRequest.cart_id
        };
        // checking if the User has a delivery address associated
        const checkIfUserHasDeliveryAddress: any = await User.findOne({
          where: { user_id: userFromRequest.user_id },
          include: {
            where: { type: 'delivery' },
            model: Address
          }}); // <--Find One
          // I create a delivery address and attach it to the user
          if(checkIfUserHasDeliveryAddress == null){
            deliveryAddressObject.user_id = userFromRequest.user_id;
          }
          const deliveryAddress = await Address.create(deliveryAddressObject);
          if(deliveryAddress)
            res.status(200).json({succes: true, deliveryAddress});
          else
            res.status(400).json({succes: false, reason: 'Server error when creating delivery address'});
      }
      }
    }
  }));

deliveryAddressRoute
.route('/:address_id')
.get(passport.authenticate('jwt', {session: false}),
  asyncWrapper(async (req: express.Request,res: express.Response,next: any) => {
    const userFromRequest:any = req.user; // passport bug, I need to do this to use the user
    const userWithDeliveryAddressAttached: any = await User.findOne({
      where: { user_id: userFromRequest.user_id },
      include: {
        where: { type: 'delivery' },
        model: Address
      }}) // <--Find One
    if(userWithDeliveryAddressAttached==null){ // I create a delivery address and attach it to the user
      res.status(400).json({succes: false, reason: 'This user has no delivery address'});
    } else {
      res.status(200).json({succes: true, userWithDeliveryAddressAttached});
    }
  }))
.put(passport.authenticate('jwt', {session: false}),
asyncWrapper(async (req: express.Request,res: express.Response,next: any) => {
  const userFromRequest:any = req.user; // passport bug, I need to do this to use the user
  // I didn't get all the parameters I need
  if( req.body.firstName===''             ||  req.body.lastName===''   ||
      req.body.email===''                 ||  req.body.postalCode==='' ||
      req.body.phoneNumber===''           ||  req.body.country==='0'   ||
      req.body.completeStreet===''        ||  req.body.city==='0'      ||
      req.body.county==='0'               ||  req.params.address_id==='undefined')
    res.status(400).json({succes: false, reason:"Some of the fields required are not completed or the address is undefined"});
  else {
    const alreadyExistingDeliveryAddress: any = await Address.findOne({
      where: { type: 'delivery' }
    });
    if(!alreadyExistingDeliveryAddress)
      res.status(400).json({msg: "There is no delivery address to update"});
    else {
      const atLeastOneEntry: any = await CartEntry.findOne({
        where: { cart_id: userFromRequest.cart_id}
      });
      // The cart has no entries
      if(!atLeastOneEntry)
        res.status(400).json({succes: false, reason: "This cart is empty"});
      else {
        // if I'm here the cart is not empty
        // creating the object
        const deliveryAddressObject: PUTAddressDTO = {
          first_name: req.body.firstName,              last_name: req.body.lastName,
          email: req.body.email,                       postal_code: req.body.postalCode,
          phone_number: req.body.phoneNumber,          country: req.body.country,
          complete_street: req.body.completeStreet,    county: req.body.county,
          city: req.body.city,                         company: req.body.company,
          type:'delivery',                              cart_id: userFromRequest.cart_id
        };
        // checking if the User has a delivery address associated
        const checkIfUserHasDeliveryAddress: any = await User.findOne({
          where: { user_id: userFromRequest.user_id },
          include: {
            where: { type: 'delivery' },
            model: Address
          }}); // <--Find One
          // I create a delivery address and attach it to the user
          if(checkIfUserHasDeliveryAddress == null){
            res.status(400).json({msg: 'There is no delivery address to update'})
          }
          const updatedAddress = await Address.update(deliveryAddressObject, {
            where: {
              [Op.and]:
              [{address_id: req.params.address_id},
               {type: 'delivery'}]
            }
          });
          // Putting the address id in the object returned because it's needed by front end and I dont want to make another request to the DB
          deliveryAddressObject.address_id = req.params.address_id;
          // Renaming the variable to be the same with the variable returned from post
          const deliveryAddress = deliveryAddressObject;
          if(updatedAddress[0] !== 0)
            res.status(200).json({succes: true, msg: 'Succes! Address updated', deliveryAddress});
          else
            res.status(400).json({succes:false, msg: 'The creation of the address failed'});
      }
    }
    }
  }))


  export { deliveryAddressRoute };