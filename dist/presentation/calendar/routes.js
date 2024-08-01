"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CalendarRoutes = void 0;
const express_1 = require("express");
const controller_1 = require("./controller");
const infrastructure_1 = require("../../infrastructure");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const config_1 = require("../../config");
class CalendarRoutes {
    static get routes() {
        const router = (0, express_1.Router)();
        const datasource = new infrastructure_1.CalendarDatasourceImpl();
        const repository = new infrastructure_1.CalendarRepositoryImpl(datasource);
        const controller = new controller_1.CalendarController(repository);
        router.use(auth_middleware_1.AuthMiddleware.validateJWT);
        router.post('/', [
            config_1.ValidatorAdapter.check('title', 'Title is required').notEmpty().isString(),
            config_1.ValidatorAdapter.check('start', 'Start date is required').notEmpty().custom(infrastructure_1.isDate),
            config_1.ValidatorAdapter.check('end', 'End date is required').notEmpty().custom(infrastructure_1.isDate),
            auth_middleware_1.AuthMiddleware.validateData
        ], controller.createEvent);
        router.put('/:id', [
            config_1.ValidatorAdapter.check('id').isMongoId().withMessage('Invalid id'),
            config_1.ValidatorAdapter.check('title', 'Title is required').notEmpty().isString(),
            config_1.ValidatorAdapter.check('start', 'Start date is required').notEmpty().custom(infrastructure_1.isDate),
            config_1.ValidatorAdapter.check('end', 'End date is required').notEmpty().custom(infrastructure_1.isDate),
            auth_middleware_1.AuthMiddleware.validateData
        ], controller.updateEvent);
        router.delete('/:id', [
            config_1.ValidatorAdapter.check('id').isMongoId().withMessage('Invalid id'),
            auth_middleware_1.AuthMiddleware.validateData
        ], controller.deleteEvent);
        router.get('/', controller.getEvents);
        return router;
    }
}
exports.CalendarRoutes = CalendarRoutes;
