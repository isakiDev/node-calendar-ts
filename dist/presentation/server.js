"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const express_1 = __importDefault(require("express"));
const config_1 = require("../config");
class Server {
    constructor({ port, routes, publicPath = 'public' }) {
        this.app = (0, express_1.default)();
        this.port = port;
        this.publicPath = publicPath;
        this.routes = routes;
    }
    start() {
        this.app.use(express_1.default.json());
        this.app.use((0, config_1.corsAdapter)());
        this.app.use(this.routes);
        this.app.use(express_1.default.static(this.publicPath));
        this.app.listen(this.port, () => {
            console.log(`Server listen in port http://localhost:${this.port}`);
        });
    }
}
exports.Server = Server;
