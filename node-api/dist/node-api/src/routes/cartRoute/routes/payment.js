"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentRoute = void 0;
const express_1 = __importDefault(require("express"));
// models I need
const databaseModel_1 = require("../../../../api-models/databaseModel");
// passport config
const passport_1 = __importDefault(require("passport"));
const passport_2 = __importDefault(require("../../../config/passport"));
passport_2.default(passport_1.default);
// function I made for the db calls
const asyncWrapper_1 = require("../../../function modules/asyncWrapper");
const paymentRoute = express_1.default.Router();
exports.paymentRoute = paymentRoute;
// Body parser and making the body a json
paymentRoute.use(express_1.default.urlencoded({ extended: false }));
paymentRoute.use(express_1.default.json());
paymentRoute
    .route('/')
    .patch(passport_1.default.authenticate('jwt', { session: false }), asyncWrapper_1.asyncWrapper((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userFromRequest = req.user; // passport bug, I need to do this to use the user
    // I didn't get all the parameters I need
    if (req.body.paymentMethod === '0')
        res.status(400).json({ succes: false, reason: "Not all the fields required are completed" });
    else {
        // If I'm here I got all the parameters
        const cart = yield databaseModel_1.Cart.findOne({
            where: {
                cart_id: userFromRequest.cart_id
            }
        });
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
        const paymentObject = {
            payment_method: req.body.paymentMethod
        };
        yield cart.update(paymentObject);
        res.status(200).json({ msg: 'Succes, payment method patched!', paymentObject });
    }
})));
//# sourceMappingURL=payment.js.map