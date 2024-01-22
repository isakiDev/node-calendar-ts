"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.envs = void 0;
const env_var_1 = require("env-var");
exports.envs = {
    PORT: (0, env_var_1.get)('PORT').required().asPortNumber(),
    DB_CNN: (0, env_var_1.get)('DB_CNN').required().asString(),
    JWT_SEED: (0, env_var_1.get)('JWT_SEED').required().asString()
};
