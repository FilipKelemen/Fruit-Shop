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
const passport_jwt_1 = require("passport-jwt");
const passport_jwt_2 = require("passport-jwt");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const databaseModel_1 = require("../../api-models/databaseModel");
const pathToKey = path_1.default.join(__dirname, "..", "/keys", "private_key.pem");
const PRIV_KEY = fs_1.default.readFileSync(pathToKey, "utf8");
const options = {
    jwtFromRequest: passport_jwt_2.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: PRIV_KEY,
    algorithms: ["RS256"]
};
const passportCallback = (passport) => {
    // The Strategy is a JWT one
    passport.use(new passport_jwt_1.Strategy(options, (jwt_payload, done) => __awaiter(void 0, void 0, void 0, function* () {
        // right now the JWT is valid
        try {
            const foundUser = yield databaseModel_1.User.findOne({ where: { user_id: jwt_payload.sub } });
            if (foundUser)
                // We found the user and the JWT is valid
                return done(null, foundUser);
            else
                // There is no user
                return done(null, false);
        }
        catch (err) {
            // Server error
            done(err, false);
        }
    })));
};
// app.ts will pass the global passport object here and this function will configure it
exports.default = passportCallback;
//# sourceMappingURL=passport.js.map