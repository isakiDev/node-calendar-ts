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
const config_1 = require("./config");
const presentation_1 = require("./presentation");
const mongo_1 = require("./data/mongo");
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield main();
}))();
function main() {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        yield mongo_1.MongoDatabase.connect({
            dbName: 'calendar',
            mongoUrl: config_1.envs.DB_CNN
        });
        new presentation_1.Server({
            port: (_a = config_1.envs.PORT) !== null && _a !== void 0 ? _a : 0,
            routes: presentation_1.AppRoutes.routes
        }).start();
    });
}
