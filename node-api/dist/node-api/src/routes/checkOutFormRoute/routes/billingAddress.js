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
exports.billingAddressRoute = void 0;
const express_1 = __importDefault(require("express"));
// models I need
const databaseModel_1 = require("../../../../api-models/databaseModel");
// passport config
const passport_1 = __importDefault(require("passport"));
const passport_2 = __importDefault(require("../../../config/passport"));
passport_2.default(passport_1.default);
// function I made for the db calls
const asyncWrapper_1 = require("../../../function modules/asyncWrapper");
const billingAddressRoute = express_1.default.Router();
exports.billingAddressRoute = billingAddressRoute;
// Body parser and making the body a json
billingAddressRoute.use(express_1.default.urlencoded({ extended: false }));
billingAddressRoute.use(express_1.default.json());
billingAddressRoute
    .route('/')
    .get(passport_1.default.authenticate('jwt', { session: false }), asyncWrapper_1.asyncWrapper((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userFromRequest = req.user; // passport bug, I need to do this to use the user
    const userWithBillingAddressAttached = yield databaseModel_1.User.findOne({
        where: { user_id: userFromRequest.user_id },
        include: {
            where: { type: 'billing' },
            model: databaseModel_1.Address
        }
    }); // <--Find One
    if (userWithBillingAddressAttached == null) { // I create a billing address and attach it to the user
        res.status(400).json({ succes: false, reason: 'This user has no billing address' });
    }
    else {
        res.status(200).json({ succes: true, userWithBillingAddressAttached });
    }
})))
    .post(passport_1.default.authenticate('jwt', { session: false }), asyncWrapper_1.asyncWrapper((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userFromRequest = req.user; // passport bug, I need to do this to use the user
    // I didn't get all the parameters I need
    // tslint:disable-next-line:no-console
    console.log(req.body);
    if (req.body.firstName === '' || req.body.lastName === '' ||
        req.body.email === '' || req.body.postalCode === '' ||
        req.body.phoneNumber === '' || req.body.country === '' ||
        req.body.completeStreet === '' || req.body.company === '')
        res.status(400).json({ succes: false, reason: "Not all the fields required are completed" });
    else {
        const cart = yield databaseModel_1.Cart.findOne({
            where: { cart_id: userFromRequest.cart_id },
        });
        // No cart was found error
        if (!cart)
            res.status(400).json({ succes: false, reason: "There is no cart associated with the user" });
        const atLeastOneEntry = yield databaseModel_1.CartEntry.findOne({
            where: { cart_id: userFromRequest.cart_id }
        });
        // The cart has no entries
        if (!atLeastOneEntry)
            res.status(400).json({ succes: false, reason: "This cart is empty" });
        // creating the object
        const billingAddressObject = {
            first_name: req.body.firstName, last_name: req.body.lastName,
            email: req.body.email, postal_code: req.body.postalCode,
            phone_number: req.body.phoneNumber, country: req.body.country,
            complete_street: req.body.completeStreet, county: req.body.county,
            city: req.body.city, company: req.body.company,
            type: 'billing', cart_id: userFromRequest.cart_id
        };
        // checking if the User has a billing address associated
        const checkIfUserHasBillingAddress = yield databaseModel_1.User.findOne({
            where: { user_id: userFromRequest.user_id },
            include: {
                where: { type: 'billing' },
                model: databaseModel_1.Address
            }
        }); // <--Find One
        // I create a billing address and attach it to the user
        if (checkIfUserHasBillingAddress == null) {
            billingAddressObject.user_id = userFromRequest.user_id;
        }
        // tslint:disable-next-line:no-console
        console.log(billingAddressObject);
        const createdAddress = yield databaseModel_1.Address.create(billingAddressObject);
        res.status(200).json({ msg: 'Succes!' });
    }
})))
    .patch(passport_1.default.authenticate('jwt', { session: false }), asyncWrapper_1.asyncWrapper((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userFromRequest = req.user; // passport bug, I need to do this to use the user
    // I didn't get all the parameters I need
    // tslint:disable-next-line:no-console
    console.log(req.body);
    if (req.body.firstName === '' || req.body.lastName === '' ||
        req.body.email === '' || req.body.postalCode === '' ||
        req.body.phoneNumber === '' || req.body.country === '' ||
        req.body.completeStreet === '' || req.body.company === '')
        res.status(400).json({ succes: false, reason: "Not all the fields required are completed" });
    else {
        const cart = yield databaseModel_1.Cart.findOne({
            where: { cart_id: userFromRequest.cart_id },
        });
        // No cart was found error
        if (!cart)
            res.status(400).json({ succes: false, reason: "There is no cart associated with the user" });
        const atLeastOneEntry = yield databaseModel_1.CartEntry.findOne({
            where: { cart_id: userFromRequest.cart_id }
        });
        // The cart has no entries
        if (!atLeastOneEntry)
            res.status(400).json({ succes: false, reason: "This cart is empty" });
        // creating the object
        const billingAddressObject = {
            first_name: req.body.firstName, last_name: req.body.lastName,
            email: req.body.email, postal_code: req.body.postalCode,
            phone_number: req.body.phoneNumber, country: req.body.country,
            complete_street: req.body.completeStreet, county: req.body.county,
            city: req.body.city, company: req.body.company,
            type: 'billing', cart_id: userFromRequest.cart_id
        };
        // checking if the User has a billing address associated
        const checkIfUserHasBillingAddress = yield databaseModel_1.User.findOne({
            where: { user_id: userFromRequest.user_id },
            include: {
                where: { type: 'billing' },
                model: databaseModel_1.Address
            }
        }); // <--Find One
        // I create a billing address and attach it to the user
        if (checkIfUserHasBillingAddress == null) {
            billingAddressObject.user_id = userFromRequest.user_id;
        }
        // tslint:disable-next-line:no-console
        console.log(billingAddressObject);
        const createdAddress = yield databaseModel_1.Address.create(billingAddressObject);
        res.status(200).json({ msg: 'Succes!' });
    }
})));
//# sourceMappingURL=billingAddress.js.map