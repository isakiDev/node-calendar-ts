"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidatorAdapter = void 0;
const express_validator_1 = require("express-validator");
class ValidatorAdapter {
    static check(fields, message) {
        return (0, express_validator_1.check)(fields);
    }
}
exports.ValidatorAdapter = ValidatorAdapter;
