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
exports.deliveryAddressRoute = void 0;
const express_1 = __importDefault(require("express"));
// models I need
const databaseModel_1 = require("../../../../api-models/databaseModel");
// passport config
const passport_1 = __importDefault(require("passport"));
const passport_2 = __importDefault(require("../../../config/passport"));
passport_2.default(passport_1.default);
// function I made for the db calls
const asyncWrapper_1 = require("../../../function modules/asyncWrapper");
const sequelize_1 = require("sequelize");
const deliveryAddressRoute = express_1.default.Router();
exports.deliveryAddressRoute = deliveryAddressRoute;
// Body parser and making the body a json
deliveryAddressRoute.use(express_1.default.urlencoded({ extended: false }));
deliveryAddressRoute.use(express_1.default.json());
deliveryAddressRoute
    .route('/')
    .post(passport_1.default.authenticate('jwt', { session: false }), asyncWrapper_1.asyncWrapper((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userFromRequest = req.user; // passport bug, I need to do this to use the user
    // I didn't get all the parameters I need
    if (req.body.firstName === '' || req.body.lastName === '' ||
        req.body.email === '' || req.body.postalCode === '' ||
        req.body.phoneNumber === '' || req.body.country === '0' ||
        req.body.completeStreet === '' || req.body.county === '0' ||
        req.body.city === '0' || req.params.address_id === 'undefined')
        res.status(400).json({ succes: false, reason: "Some of the fields required are not completed or the address is undefined" });
    else {
        // If I'm here I got all the parameters
        // Checking if the cart somehow has a delivery address already and the front end made a request to post by mistake
        const alreadyExistingDeliveryAddress = yield databaseModel_1.Address.findOne({
            where: { [sequelize_1.Op.and]: [
                    { type: 'billing' },
                    { cart_id: userFromRequest.cart_id }
                ] }
        });
        if (alreadyExistingDeliveryAddress) {
            res.status(400).json({ succes: false, reason: "This cart has a delivery address already" });
        }
        else {
            // If I'm here there is no other delivery address associated with the cart
            const atLeastOneEntry = yield databaseModel_1.CartEntry.findOne({
                where: { cart_id: userFromRequest.cart_id }
            });
            // The cart has no entries
            if (!atLeastOneEntry)
                res.status(400).json({ succes: false, reason: "This cart is empty" });
            else {
                // If I'm here the cart is not empty
                // creating the object
                const deliveryAddressObject = {
                    first_name: req.body.firstName, last_name: req.body.lastName,
                    email: req.body.email, postal_code: req.body.postalCode,
                    phone_number: req.body.phoneNumber, country: req.body.country,
                    complete_street: req.body.completeStreet, county: req.body.county,
                    city: req.body.city, company: req.body.company,
                    type: 'delivery', cart_id: userFromRequest.cart_id
                };
                // checking if the User has a delivery address associated
                const checkIfUserHasDeliveryAddress = yield databaseModel_1.User.findOne({
                    where: { user_id: userFromRequest.user_id },
                    include: {
                        where: { type: 'delivery' },
                        model: databaseModel_1.Address
                    }
                }); // <--Find One
                // I create a delivery address and attach it to the user
                if (checkIfUserHasDeliveryAddress == null) {
                    deliveryAddressObject.user_id = userFromRequest.user_id;
                }
                const deliveryAddress = yield databaseModel_1.Address.create(deliveryAddressObject);
                if (deliveryAddress)
                    res.status(200).json({ succes: true, deliveryAddress });
                else
                    res.status(400).json({ succes: false, reason: 'Server error when creating delivery address' });
            }
        }
    }
})));
deliveryAddressRoute
    .route('/:address_id')
    .get(passport_1.default.authenticate('jwt', { session: false }), asyncWrapper_1.asyncWrapper((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userFromRequest = req.user; // passport bug, I need to do this to use the user
    const userWithDeliveryAddressAttached = yield databaseModel_1.User.findOne({
        where: { user_id: userFromRequest.user_id },
        include: {
            where: { type: 'delivery' },
            model: databaseModel_1.Address
        }
    }); // <--Find One
    if (userWithDeliveryAddressAttached == null) { // I create a delivery address and attach it to the user
        res.status(400).json({ succes: false, reason: 'This user has no delivery address' });
    }
    else {
        res.status(200).json({ succes: true, userWithDeliveryAddressAttached });
    }
})))
    .put(passport_1.default.authenticate('jwt', { session: false }), asyncWrapper_1.asyncWrapper((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userFromRequest = req.user; // passport bug, I need to do this to use the user
    // I didn't get all the parameters I need
    if (req.body.firstName === '' || req.body.lastName === '' ||
        req.body.email === '' || req.body.postalCode === '' ||
        req.body.phoneNumber === '' || req.body.country === '0' ||
        req.body.completeStreet === '' || req.body.city === '0' ||
        req.body.county === '0' || req.params.address_id === 'undefined')
        res.status(400).json({ succes: false, reason: "Some of the fields required are not completed or the address is undefined" });
    else {
        const alreadyExistingDeliveryAddress = yield databaseModel_1.Address.findOne({
            where: { type: 'delivery' }
        });
        if (!alreadyExistingDeliveryAddress)
            res.status(400).json({ msg: "There is no delivery address to update" });
        else {
            const atLeastOneEntry = yield databaseModel_1.CartEntry.findOne({
                where: { cart_id: userFromRequest.cart_id }
            });
            // The cart has no entries
            if (!atLeastOneEntry)
                res.status(400).json({ succes: false, reason: "This cart is empty" });
            else {
                // if I'm here the cart is not empty
                // creating the object
                const deliveryAddressObject = {
                    first_name: req.body.firstName, last_name: req.body.lastName,
                    email: req.body.email, postal_code: req.body.postalCode,
                    phone_number: req.body.phoneNumber, country: req.body.country,
                    complete_street: req.body.completeStreet, county: req.body.county,
                    city: req.body.city, company: req.body.company,
                    type: 'delivery', cart_id: userFromRequest.cart_id
                };
                // checking if the User has a delivery address associated
                const checkIfUserHasDeliveryAddress = yield databaseModel_1.User.findOne({
                    where: { user_id: userFromRequest.user_id },
                    include: {
                        where: { type: 'delivery' },
                        model: databaseModel_1.Address
                    }
                }); // <--Find One
                // I create a delivery address and attach it to the user
                if (checkIfUserHasDeliveryAddress == null) {
                    res.status(400).json({ msg: 'There is no delivery address to update' });
                }
                const updatedAddress = yield databaseModel_1.Address.update(deliveryAddressObject, {
                    where: {
                        [sequelize_1.Op.and]: [{ address_id: req.params.address_id },
                            { type: 'delivery' }]
                    }
                });
                // Putting the address id in the object returned because it's needed by front end and I dont want to make another request to the DB
                deliveryAddressObject.address_id = req.params.address_id;
                // Renaming the variable to be the same with the variable returned from post
                const deliveryAddress = deliveryAddressObject;
                if (updatedAddress[0] !== 0)
                    res.status(200).json({ succes: true, msg: 'Succes! Address updated', deliveryAddress });
                else
                    res.status(400).json({ succes: false, msg: 'The creation of the address failed' });
            }
        }
    }
})));
//# sourceMappingURL=deliveryAddress.js.map