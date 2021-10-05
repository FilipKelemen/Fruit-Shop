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
exports.productsRoute = void 0;
const express_1 = __importDefault(require("express"));
const asyncWrapper_1 = require("../../src/function modules/asyncWrapper");
const databaseModel_1 = require("../../api-models/databaseModel");
const productsRoute = express_1.default.Router();
exports.productsRoute = productsRoute;
productsRoute.use(express_1.default.urlencoded({ extended: false })); // Both used to make POST see my request, otherwise it comes as undefined
productsRoute.use(express_1.default.json());
productsRoute
    .route('/')
    .get(asyncWrapper_1.asyncWrapper((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    res.json(yield databaseModel_1.Product.findAll());
})))
    .post(asyncWrapper_1.asyncWrapper((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newProduct = {
        "product_id": req.body.product_id,
        "number_in_stock": req.body.number_in_stock,
        "colors": req.body.colors,
        "image": req.body.image,
        "price": req.body.price,
        "name": req.body.name,
        "description": req.body.description
    };
    if (newProduct.product_id == null || newProduct.image == null || newProduct.price == null || newProduct.name == null || newProduct.description == null) {
        res.status(400).json({ "msg": `No product with name found ${newProduct.name}.` });
    }
    else {
        // Insert into table
        yield databaseModel_1.Product.create(newProduct);
        res.status(200).json({ "msg": "Product succesfully added!" });
    }
})));
//# sourceMappingURL=productsRoute.js.map