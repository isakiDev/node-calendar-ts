"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppRoutes = void 0;
const express_1 = require("express");
const _1 = require(".");
class AppRoutes {
    static get routes() {
        const router = (0, express_1.Router)();
        router.use('/api/auth', _1.AuthRoutes.routes);
        router.use('/api/calendar', _1.CalendarRoutes.routes);
        router.use('*', (req, res) => {
            res.send('Welcome to my Api');
        });
        return router;
    }
}
exports.AppRoutes = AppRoutes;
