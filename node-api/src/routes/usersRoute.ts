// Login and Register here
import express from 'express';
import { asyncWrapper } from '../../src/function modules/asyncWrapper';
import bcryptjs from 'bcryptjs';
import { issueJWT } from '../../src/utils/JSON_token';

import { RegisterUserDTO, LoginUserDTO } from '../../../src/app/models/models';
import { Cart, User, CartEntry, Product } from '../../api-models/databaseModel'


import passport from 'passport';
import  passportCallback from '../../src/config/passport';
passportCallback(passport); // needed to make passport do it's thing

const usersRoute = express.Router();
usersRoute.use(express.urlencoded({ extended: false })); // To see body and read jsons
usersRoute.use(express.json());

usersRoute
.route('/login')
.post(asyncWrapper(async (req: express.Request<LoginUserDTO>,res: express.Response,next : any) => {
 // Finding user
  const foundUser = await User.findOne( {where : { email: req.body.email } } );
  if(foundUser){
    bcryptjs.compare(req.body.password,foundUser.getDataValue('password'), async (err, result) => {
      if(result){
        // The user is found and the passwords match
        const jwt = issueJWT(foundUser);

        res.status(200).json({succes: true,user: foundUser, token: jwt.token, expiresIn: jwt.expires});
      } else {
        // The passwords don't match
        res.status(401).json({succes:false});
      }
  });
  } else {   // User not found
    res.status(401).json({succes:false});
  }
}));

usersRoute
.route('/register')

.get(asyncWrapper(async (req: express.Request<RegisterUserDTO>,res: express.Response,next : any) => {
  res.json(await User.findByPk(Number(req.body.id)));
}))

.post(asyncWrapper(async (req: express.Request<RegisterUserDTO>,res: express.Response,next : any) => {
  // deconstructing with types to send only the relevant information to the database
  const { email, passwordConfirmation, firstName: first_name, lastName: last_name}
        :  {email:string, passwordConfirmation: string, firstName:string, lastName:string} = req.body;
  let {password} : { password:string} = req.body; // I need to change the password to it's hashed state
  // Making sure a bad formatted user never enters the database
  if(await User.findOne({ where: { email } }) !== null)
    res.json({msg: "The user with this email already exists!"});
  else if(password !== passwordConfirmation)
          res.json({msg: "The passwords don't match!"});
  else{
    // hashing password
    bcryptjs.genSalt(10, (err: Error,salt:string) => {
      if(err) throw err;
      bcryptjs.hash(password, salt,async(err2: Error, hashedPass:string) => {
        if(err2) throw err2;
        password = hashedPass;
        try{

          const newCart = await Cart.create();
          const newUser = await User.create({email,password,first_name,last_name, cart_id: newCart.getDataValue('cart_id')});
          const jwt = issueJWT(newUser);

          res.json({succes: true,user: newUser,cart: newCart, token: jwt.token, expiresIn: jwt.expires});
        }catch(err3){
          res.status(401).json({succes:false, err3});
        }
      });
    });
  }
}));

export { usersRoute };