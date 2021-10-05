"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.issueJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const pathToKey = path_1.default.join(__dirname, "..", "/keys", "private_key.pem");
const PRIV_KEY = fs_1.default.readFileSync(pathToKey, "utf8");
const issueJWT = (user) => {
    const user_id = user.user_id;
    const expiresIn = "14d"; // It has to be in this format ="3d","172d" etc otherwise the way front end handles it breaks the app
    const payload = {
        sub: user_id,
        iat: Date.now()
    };
    const signedToken = jsonwebtoken_1.default.sign(payload, PRIV_KEY, {
        expiresIn,
        algorithm: "RS256"
    });
    return {
        token: "Bearer " + signedToken,
        expires: expiresIn
    };
};
exports.issueJWT = issueJWT;
//# sourceMappingURL=JSON_token.js.map