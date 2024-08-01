"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isDate = void 0;
const luxon_1 = require("luxon");
const isDate = (value) => {
    if (!value)
        return false;
    if (luxon_1.DateTime.fromISO(value).isValid)
        return true;
    return false;
};
exports.isDate = isDate;
