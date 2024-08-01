"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterUserDto = void 0;
class RegisterUserDto {
    constructor(name, email, password) {
        this.name = name;
        this.email = email;
        this.password = password;
    }
    static create(object) {
        const { name, email, password } = object;
        if (!name)
            return ['Missing name'];
        if (!email)
            return ['Missing email'];
        if (!password)
            return ['Missing password'];
        return [
            undefined,
            new RegisterUserDto(name, email, password)
        ];
    }
}
exports.RegisterUserDto = RegisterUserDto;
