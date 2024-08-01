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
exports.RegisterUser = void 0;
const __1 = require("../..");
const config_1 = require("../../../config");
class RegisterUser {
    constructor(authRepository, signToken = config_1.JwtAdapter.generateToken) {
        this.authRepository = authRepository;
        this.signToken = signToken;
    }
    execute(registerUserDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, name, email } = yield this.authRepository.register(registerUserDto);
            const token = yield this.signToken({ uid: id, name }, '1h');
            if (!token)
                throw __1.CustomError.badRequest('Token not generated');
            return {
                token,
                user: {
                    id,
                    email,
                    name
                }
            };
        });
    }
}
exports.RegisterUser = RegisterUser;
