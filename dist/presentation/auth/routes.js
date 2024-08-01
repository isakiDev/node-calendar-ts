"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const express_1 = require("express");
const infrastructure_1 = require("../../infrastructure");
const controller_1 = require("./controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const config_1 = require("../../config");
class AuthRoutes {
    static get routes() {
        const router = (0, express_1.Router)();
        const datasource = new infrastructure_1.AuthDatasourceImpl();
        const repository = new infrastructure_1.AuthRepositoryImpl(datasource);
        const controller = new controller_1.AuthController(repository);
        router.post('/register', [
            config_1.ValidatorAdapter.check('name').notEmpty().withMessage('Name is required'),
            config_1.ValidatorAdapter.check('email').isEmail().withMessage('Email is required'),
            config_1.ValidatorAdapter.check('password').notEmpty().isLength({ min: 6 })
                .withMessage('Password must be minimum 6 characters')
                .matches(/^[^\s]+$/).withMessage('Password cannot contain spaces'),
            auth_middleware_1.AuthMiddleware.validateData
        ], controller.register);
        router.post('/login', [
            config_1.ValidatorAdapter.check('email').isEmail().withMessage('Email is required'),
            config_1.ValidatorAdapter.check('password').isLength({ min: 6 }).withMessage('Password must be minimum 6 characters'),
            auth_middleware_1.AuthMiddleware.validateData
        ], controller.login);
        router.get('/rev', auth_middleware_1.AuthMiddleware.validateJWT, controller.revalidateToken);
        return router;
    }
}
exports.AuthRoutes = AuthRoutes;
