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
exports.LoginUser = void 0;
const __1 = require("../..");
const config_1 = require("../../../config");
class LoginUser {
    constructor(authRepository) {
        this.authRepository = authRepository;
    }
    execute(loginUserDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, name, email } = yield this.authRepository.login(loginUserDto);
            const token = yield config_1.JwtAdapter.generateToken({ uid: id, name });
            if (!token)
                throw __1.CustomError.internalServer('Error generating token');
            return {
                token,
                user: {
                    id,
                    name,
                    email
                }
            };
        });
    }
}
exports.LoginUser = LoginUser;
