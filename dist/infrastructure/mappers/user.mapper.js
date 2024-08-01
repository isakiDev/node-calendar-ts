"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserMapper = void 0;
const domain_1 = require("../../domain");
class UserMapper {
    static userEntityFromObject(object) {
        const { id, _id, name, email, password } = object;
        if (!_id || !id) {
            throw new Error('Missing id');
        }
        if (!name)
            throw new Error('Missing name');
        if (!email)
            throw new Error('Missing email');
        if (!password)
            throw new Error('Missing password');
        return new domain_1.UserEntity(_id || id, name, email, password);
    }
}
exports.UserMapper = UserMapper;
