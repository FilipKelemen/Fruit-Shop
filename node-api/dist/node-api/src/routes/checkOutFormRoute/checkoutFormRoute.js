"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkoutFormRoute = void 0;
const express_1 = __importDefault(require("express"));
// passport config
const passport_1 = __importDefault(require("passport"));
const passport_2 = __importDefault(require("../../config/passport"));
passport_2.default(passport_1.default);
const checkoutFormRoute = express_1.default.Router();
exports.checkoutFormRoute = checkoutFormRoute;
// Body parser and making the body a json
checkoutFormRoute.use(express_1.default.urlencoded({ extended: false }));
checkoutFormRoute.use(express_1.default.json());
// routes
const billingAddress_1 = require("./routes/billingAddress");
const deliveryAddress_1 = require("./routes/deliveryAddress");
const deliveryService_1 = require("./routes/deliveryService");
const payment_1 = require("./routes/payment");
checkoutFormRoute.use('/billingAddressRoute', billingAddress_1.billingAddressRoute);
checkoutFormRoute.use('/deliveryAddressRoute', deliveryAddress_1.deliveryAddressRoute);
checkoutFormRoute.use('/deliveryService', deliveryService_1.deliveryServiceRoute);
checkoutFormRoute.use('/paymentRoute', payment_1.paymentRoute);
checkoutFormRoute
    .route('/');
//# sourceMappingURL=checkoutFormRoute.js.map