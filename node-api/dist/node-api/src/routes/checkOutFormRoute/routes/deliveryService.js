"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deliveryServiceRoute = void 0;
const express_1 = __importDefault(require("express"));
// passport config
const passport_1 = __importDefault(require("passport"));
const passport_2 = __importDefault(require("../../../config/passport"));
passport_2.default(passport_1.default);
const deliveryServiceRoute = express_1.default.Router();
exports.deliveryServiceRoute = deliveryServiceRoute;
// Body parser and making the body a json
deliveryServiceRoute.use(express_1.default.urlencoded({ extended: false }));
deliveryServiceRoute.use(express_1.default.json());
deliveryServiceRoute
    .route('/');
//# sourceMappingURL=deliveryService.js.map