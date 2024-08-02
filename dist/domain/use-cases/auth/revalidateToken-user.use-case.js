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
exports.RevalidateToken = void 0;
const config_1 = require("../../../config");
const custom_error_1 = require("../../errors/custom.error");
class RevalidateToken {
    constructor(authRepository, signToken = config_1.JwtAdapter.generateToken) {
        this.authRepository = authRepository;
        this.signToken = signToken;
    }
    execute(revalidateTokenDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { uid, name } = yield this.authRepository.revalidateToken(revalidateTokenDto);
            const token = yield this.signToken({ uid, name }, '1h');
            if (!token)
                throw custom_error_1.CustomError.badRequest('Token not generated');
            return {
                token,
                user: {
                    id: uid,
                    name
                }
            };
        });
    }
}
exports.RevalidateToken = RevalidateToken;
