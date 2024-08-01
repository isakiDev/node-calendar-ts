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
exports.AuthDatasourceImpl = void 0;
const mongo_1 = require("../../data/mongo");
const domain_1 = require("../../domain");
const __1 = require("../");
const config_1 = require("../../config");
class AuthDatasourceImpl {
    constructor(hashPassword = config_1.BcryptAdapter.hash, comparePassword = config_1.BcryptAdapter.compare) {
        this.hashPassword = hashPassword;
        this.comparePassword = comparePassword;
    }
    login(loginUserDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = loginUserDto;
            try {
                const user = yield mongo_1.UserModel.findOne({ email });
                if (!user)
                    throw domain_1.CustomError.badRequest('User not exists');
                const isMatching = this.comparePassword(password, user.password);
                if (!isMatching)
                    throw domain_1.CustomError.badRequest('Invalid password');
                return __1.UserMapper.userEntityFromObject(user);
            }
            catch (error) {
                if (error instanceof domain_1.CustomError) {
                    throw error;
                }
                throw domain_1.CustomError.internalServer();
            }
        });
    }
    register(registerUserDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, email, password } = registerUserDto;
            try {
                const existsUser = yield mongo_1.UserModel.findOne({ email });
                if (existsUser)
                    throw domain_1.CustomError.badRequest('User already exists');
                const user = yield mongo_1.UserModel.create({
                    email,
                    name,
                    password: this.hashPassword(password)
                });
                yield user.save();
                return __1.UserMapper.userEntityFromObject(user);
            }
            catch (error) {
                if (error instanceof domain_1.CustomError) {
                    throw error;
                }
                throw domain_1.CustomError.internalServer();
            }
        });
    }
    revalidateToken(revalidateTokenDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { uid, name } = revalidateTokenDto;
            try {
                return new domain_1.RevalidateTokenDto(uid, name);
            }
            catch (error) {
                if (error instanceof domain_1.CustomError) {
                    throw error;
                }
                throw domain_1.CustomError.internalServer();
            }
        });
    }
}
exports.AuthDatasourceImpl = AuthDatasourceImpl;
