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
exports.checkoutFormRoute = void 0;
const express_1 = __importDefault(require("express"));
// models I need
const databaseModel_1 = require("../../api-models/databaseModel");
// passport config
const passport_1 = __importDefault(require("passport"));
const passport_2 = __importDefault(require("../../src/config/passport"));
passport_2.default(passport_1.default);
// function I made for the db calls
const asyncWrapper_1 = require("../function modules/asyncWrapper");
const checkoutFormRoute = express_1.default.Router();
exports.checkoutFormRoute = checkoutFormRoute;
// Body parser and making the body a json
checkoutFormRoute.use(express_1.default.urlencoded({ extended: false }));
checkoutFormRoute.use(express_1.default.json());
checkoutFormRoute
    .route('/')
    .get(passport_1.default.authenticate('jwt', { session: false }), asyncWrapper_1.asyncWrapper((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userFromRequest = req.user; // The passport library can't read req.user.email because the types are broken so i have to capy the user in another variable
    // tslint:disable-next-line:no-console
    console.log(userFromRequest);
    const order = yield databaseModel_1.Order.findOne({
        where: { cart_id: userFromRequest.cart_id },
    });
    res.status(200).json(order);
})))
    .post(passport_1.default.authenticate('jwt', { session: false }), asyncWrapper_1.asyncWrapper((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // const userFromRequest:any = req.user; // passport bug, I need to do this to use the user
    // if(req.params.cart_id == null || req.body.delivery_service == null
    //   || req.body.delivery_address || req.body.payment_method || req.body.billing_address)
    //   res.status(400).json({succes: false, reason:"Not all the fields required are completed"});
    // else {}
})));
//# sourceMappingURL=checkoutFormRoute.js.map