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
exports.usersRoute = void 0;
// Login and Register here
const express_1 = __importDefault(require("express"));
const asyncWrapper_1 = require("../../src/function modules/asyncWrapper");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const JSON_token_1 = require("../../src/utils/JSON_token");
const databaseModel_1 = require("../../api-models/databaseModel");
const passport_1 = __importDefault(require("passport"));
const passport_2 = __importDefault(require("../../src/config/passport"));
passport_2.default(passport_1.default); // needed to make passport do it's thing
const usersRoute = express_1.default.Router();
exports.usersRoute = usersRoute;
usersRoute.use(express_1.default.urlencoded({ extended: false })); // To see body and read jsons
usersRoute.use(express_1.default.json());
usersRoute
    .route('/login')
    .post(asyncWrapper_1.asyncWrapper((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // Finding user
    const foundUser = yield databaseModel_1.User.findOne({ where: { email: req.body.email } });
    if (foundUser) {
        bcryptjs_1.default.compare(req.body.password, foundUser.getDataValue('password'), (err, result) => __awaiter(void 0, void 0, void 0, function* () {
            if (result) {
                // The user is found and the passwords match
                const jwt = JSON_token_1.issueJWT(foundUser);
                res.status(200).json({ succes: true, user: foundUser, token: jwt.token, expiresIn: jwt.expires });
            }
            else {
                // The passwords don't match
                res.status(401).json({ succes: false });
            }
        }));
    }
    else { // User not found
        res.status(401).json({ succes: false });
    }
})));
usersRoute
    .route('/register')
    .get(asyncWrapper_1.asyncWrapper((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    res.json(yield databaseModel_1.User.findByPk(Number(req.body.id)));
})))
    .post(asyncWrapper_1.asyncWrapper((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // deconstructing with types to send only the relevant information to the database
    const { email, passwordConfirmation, firstName: first_name, lastName: last_name } = req.body;
    let { password } = req.body; // I need to change the password to it's hashed state
    // Making sure a bad formatted user never enters the database
    if ((yield databaseModel_1.User.findOne({ where: { email } })) !== null)
        res.json({ msg: "The user with this email already exists!" });
    else if (password !== passwordConfirmation)
        res.json({ msg: "The passwords don't match!" });
    else {
        // hashing password
        bcryptjs_1.default.genSalt(10, (err, salt) => {
            if (err)
                throw err;
            bcryptjs_1.default.hash(password, salt, (err2, hashedPass) => __awaiter(void 0, void 0, void 0, function* () {
                if (err2)
                    throw err2;
                password = hashedPass;
                try {
                    const newCart = yield databaseModel_1.Cart.create();
                    const newUser = yield databaseModel_1.User.create({ email, password, first_name, last_name, cart_id: newCart.getDataValue('cart_id') });
                    const jwt = JSON_token_1.issueJWT(newUser);
                    res.json({ succes: true, user: newUser, cart: newCart, token: jwt.token, expiresIn: jwt.expires });
                }
                catch (err3) {
                    res.status(401).json({ succes: false, err3 });
                }
            }));
        });
    }
})));
//# sourceMappingURL=usersRoute.js.map