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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthMiddleware = void 0;
const express_validator_1 = require("express-validator");
const domain_1 = require("../../domain");
const config_1 = require("../../config");
class AuthMiddleware {
    static validateJWT(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const tokenHeader = req.header('Authorization');
            try {
                if (!tokenHeader)
                    throw domain_1.CustomError.unauthorized('Missing token');
                if (!tokenHeader.startsWith('Bearer'))
                    throw domain_1.CustomError.unauthorized('Invalid bearer token');
                const token = (_a = tokenHeader.split(' ').at(1)) !== null && _a !== void 0 ? _a : '';
                const data = yield config_1.JwtAdapter.validateToken(token);
                if (!data) {
                    return res.status(401).json({
                        error: 'Invalid token'
                    });
                }
                req.body.user = {
                    uid: data.uid,
                    name: data.name
                };
                next();
            }
            catch (error) {
                if (error instanceof domain_1.CustomError) {
                    res.status(error.statusCode).json({ error: error.message });
                }
                domain_1.CustomError.internalServer();
            }
        });
    }
    static validateData(req, res, next) {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.mapped()
            });
        }
        next();
    }
}
exports.AuthMiddleware = AuthMiddleware;
