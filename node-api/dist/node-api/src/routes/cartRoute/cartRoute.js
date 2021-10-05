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
exports.cartRoute = void 0;
// The cart will be a protected route nad only users can use it.
const express_1 = __importDefault(require("express"));
const databaseModel_1 = require("../../../api-models/databaseModel");
// passport config
const passport_1 = __importDefault(require("passport"));
const passport_2 = __importDefault(require("../../config/passport"));
const asyncWrapper_1 = require("../../function modules/asyncWrapper");
const sequelize_1 = require("sequelize");
passport_2.default(passport_1.default);
// routes
const cartRoute = express_1.default.Router();
exports.cartRoute = cartRoute;
const billingAddress_1 = require("../cartRoute/routes/billingAddress");
const deliveryAddress_1 = require("../cartRoute/routes/deliveryAddress");
const deliveryService_1 = require("../cartRoute/routes/deliveryService");
const payment_1 = require("../cartRoute/routes/payment");
cartRoute.use('/billingAddressRoute', billingAddress_1.billingAddressRoute);
cartRoute.use('/deliveryAddressRoute', deliveryAddress_1.deliveryAddressRoute);
cartRoute.use('/deliveryServiceRoute', deliveryService_1.deliveryServiceRoute);
cartRoute.use('/paymentRoute', payment_1.paymentRoute);
// make express see the body and make it a json
cartRoute.use(express_1.default.urlencoded({ extended: false }));
cartRoute.use(express_1.default.json());
cartRoute
    .route('/')
    .get(passport_1.default.authenticate('jwt', { session: false }), asyncWrapper_1.asyncWrapper((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userFromRequest = req.user; // The passport library can't read req.user.email because the types are broken so i have to capy the user in another variable
    const cart = yield databaseModel_1.Cart.findOne({
        where: { cart_id: userFromRequest.cart_id },
        include: [{
                model: databaseModel_1.CartEntry,
                include: {
                    model: databaseModel_1.Product
                }
            }, {
                model: databaseModel_1.Address,
            }, {
                model: databaseModel_1.DeliveryService
            }],
    });
    res.status(200).json(cart);
})))
    .post(passport_1.default.authenticate('jwt', { session: false }), asyncWrapper_1.asyncWrapper((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userFromRequest = req.user; // The passport library can't read req.user.email because the types are broken so i have to capy the user in another variable
    // creating the blueprint of the entry I will send
    const newCartEntry = {
        "product_id": req.body.product_id,
        "quantity": req.body.quantity,
    };
    if (newCartEntry.product_id == null || newCartEntry.quantity == null) {
        res.status(400).json({ succes: false });
    }
    else {
        // checking if an entry in the same cart with the same product exists
        const existingProduct = yield databaseModel_1.CartEntry.findOne({ where: { [sequelize_1.Op.and]: [
                    { product_id: newCartEntry.product_id },
                    { cart_id: userFromRequest.cart_id }
                ] } });
        // checking if the product exists nad the quantity is ok
        const foundProduct = yield databaseModel_1.Product.findOne({ where: { product_id: newCartEntry.product_id } });
        // The if checks if there is no entry with the same product in the cart, if the product exists and if the quantity is ok
        if (!existingProduct &&
            foundProduct &&
            newCartEntry.quantity >= 1 &&
            Number.isInteger(newCartEntry.quantity)) {
            // creating a new cart entry record
            yield databaseModel_1.CartEntry.create({ quantity: newCartEntry.quantity, cart_id: userFromRequest.cart_id, product_id: newCartEntry.product_id });
            // changing the total and formatted total
            const cart = yield databaseModel_1.Cart.findOne({
                where: { cart_id: userFromRequest.cart_id },
                include: [{
                        model: databaseModel_1.CartEntry,
                        include: {
                            model: databaseModel_1.Product
                        }
                    }, {
                        model: databaseModel_1.Address
                    }, {
                        model: databaseModel_1.DeliveryService
                    }],
            });
            let newTotal = cart.getDataValue('total');
            newTotal += foundProduct.getDataValue('price').value;
            const newFormattedTotal = '$' + newTotal;
            cart.total = newTotal;
            cart.formatted_total = newFormattedTotal;
            // updating the DB
            yield databaseModel_1.Cart.update({ total: newTotal, formatted_total: newFormattedTotal }, {
                where: {
                    cart_id: userFromRequest.cart_id
                }
            });
            // sending the cart back to the frontend with the values modified
            res.status(200).json(cart);
        }
        else
            res.status(400).json({ succes: false });
    }
})));
cartRoute
    .route('/products/:product_id')
    .delete(passport_1.default.authenticate('jwt', { session: false }), asyncWrapper_1.asyncWrapper((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userFromRequest = req.user; // The passport library can't read req.user.email because the types are broken so i have to capy the user in another variable
    if (req.params.product_id === null) {
        res.status(400).json({ succes: false });
    }
    else {
        // checking if an entry in the same cart with the same product exists
        const existingProduct = yield databaseModel_1.CartEntry.findOne({ where: { [sequelize_1.Op.and]: [
                    { product_id: req.params.product_id },
                    { cart_id: userFromRequest.cart_id }
                ] } });
        // The if checks if there is an entry with this product in cart
        if (existingProduct) {
            // finding only the entry that I need
            let cart = yield databaseModel_1.Cart.findOne({
                where: { cart_id: userFromRequest.cart_id },
                include: {
                    where: { product_id: req.params.product_id },
                    model: databaseModel_1.CartEntry,
                    include: {
                        model: databaseModel_1.Product
                    }
                },
            });
            // changing the total and formatted total
            let newTotal = cart.total;
            // going in the cart returned from the Db to the values I need
            newTotal -= (cart.cart_entries[0].product.price.value) * (cart.getDataValue('cart_entries')[0].quantity);
            const newFormattedTotal = '$' + newTotal;
            // deleting the entry
            cart.cart_entries[0].destroy();
            // updating the DB
            yield databaseModel_1.Cart.update({ total: newTotal, formatted_total: newFormattedTotal }, {
                where: {
                    cart_id: userFromRequest.cart_id
                }
            });
            // fetching the new cart from the database
            cart = yield databaseModel_1.Cart.findOne({
                where: { cart_id: userFromRequest.cart_id },
                include: [{
                        model: databaseModel_1.CartEntry,
                        include: {
                            model: databaseModel_1.Product
                        }
                    }, {
                        model: databaseModel_1.Address
                    }, {
                        model: databaseModel_1.DeliveryService
                    }],
            });
            // sending the cart back to the frontend with the values modified
            res.status(200).json(cart);
        }
        else
            res.status(400).json({ succes: false });
    }
})))
    .patch(passport_1.default.authenticate('jwt', { session: false }), asyncWrapper_1.asyncWrapper((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userFromRequest = req.user;
    if (req.params.product_id == null || req.body.quantity == null)
        res.status(400).json({ succes: false });
    else {
        // checking if an entry in the same cart with the same product exists
        const existingProduct = yield databaseModel_1.CartEntry.findOne({ where: { [sequelize_1.Op.and]: [
                    { product_id: req.params.product_id },
                    { cart_id: userFromRequest.cart_id }
                ] } });
        // The if checks if there is an entry with this product in cart
        if (existingProduct) {
            let cart = yield databaseModel_1.Cart.findOne({
                where: { cart_id: userFromRequest.cart_id },
                include: {
                    where: { product_id: req.params.product_id },
                    model: databaseModel_1.CartEntry,
                    include: {
                        model: databaseModel_1.Product
                    }
                },
            });
            // changing the total and formatted total
            let newTotal = cart.total;
            // Checking if the quantity has changed by one and updating the total in the api
            if (req.body.quantity === cart.cart_entries[0].quantity - 1 && req.body.quantity >= 1) { // Substracting one from quantity
                newTotal -= cart.cart_entries[0].product.price.value;
            }
            if (req.body.quantity === cart.cart_entries[0].quantity + 1 && req.body.quantity <= cart.cart_entries[0].product.number_in_stock) { // Adding to quantity
                newTotal += cart.cart_entries[0].product.price.value;
            }
            // If a change has occured I am changing the value in the DataBase
            if (newTotal !== cart.total) {
                const newFormattedTotal = '$' + newTotal;
                yield databaseModel_1.CartEntry.update({ quantity: req.body.quantity }, {
                    where: {
                        cart_entry_id: cart.cart_entries[0].cart_entry_id
                    }
                });
                // updating total in DB
                yield databaseModel_1.Cart.update({ total: newTotal, formatted_total: newFormattedTotal }, {
                    where: {
                        cart_id: userFromRequest.cart_id
                    }
                });
                // fetching the new cart from the database
                cart = yield databaseModel_1.Cart.findOne({
                    where: { cart_id: userFromRequest.cart_id },
                    include: [{
                            model: databaseModel_1.CartEntry,
                            include: {
                                model: databaseModel_1.Product
                            }
                        }, {
                            model: databaseModel_1.Address
                        }, {
                            model: databaseModel_1.DeliveryService
                        }],
                });
                // sending the cart back to the frontend with the values modified
                res.status(200).json(cart);
            }
            else {
                // It failed because there are no more items in stock
                if (req.body.quantity === cart.cart_entries[0].quantity + 1) {
                    res.status(400).json({ succes: false, reason: "Out of stock" });
                }
                res.status(500).json({ succes: false });
            }
        }
    }
})));
//# sourceMappingURL=cartRoute.js.map