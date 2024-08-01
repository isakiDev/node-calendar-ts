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
exports.AuthController = void 0;
const domain_1 = require("../../domain");
class AuthController {
    constructor(authRepository) {
        this.authRepository = authRepository;
        this.login = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const [error, loginUserDto] = domain_1.LoginUserDto.create(req.body);
            if (error)
                return res.status(400).json({ error });
            new domain_1.LoginUser(this.authRepository)
                .execute(loginUserDto)
                .then(data => res.json(data))
                .catch(error => this.handleError(error, res));
        });
        this.register = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const [error, registerUserDto] = domain_1.RegisterUserDto.create(req.body);
            if (error)
                return res.status(400).json({ error });
            new domain_1.RegisterUser(this.authRepository)
                .execute(registerUserDto)
                .then(data => res.json(data))
                .catch(error => this.handleError(error, res));
        });
        this.revalidateToken = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { uid, name } = req.body.user;
            const [error, revalidateTokenDto] = domain_1.RevalidateTokenDto.create({ uid, name });
            if (error)
                return res.status(400).json({ error });
            new domain_1.RevalidateToken(this.authRepository)
                .execute(revalidateTokenDto)
                .then(data => res.json(data))
                .catch(error => this.handleError(error, res));
        });
    }
    handleError(error, res) {
        if (error instanceof domain_1.CustomError) {
            return res.status(error.statusCode).json({ error: error.message });
        }
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
exports.AuthController = AuthController;
