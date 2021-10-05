"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.asyncWrapper = void 0;
let asyncWrapper = (callback) => {
    return (req, res, next) => {
        callback(req, res, next)
            .catch(next);
    };
};
exports.asyncWrapper = asyncWrapper;
//# sourceMappingURL=asyncWrapper.js.map