"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginUserDto = void 0;
class LoginUserDto {
    constructor(email, password) {
        this.email = email;
        this.password = password;
    }
    // static create (object: Record<string, unknown>): [string?, LoginUserDto?] {
    static create(object) {
        const { email, password } = object;
        if (!email || !email)
            return ['Missing email'];
        if (!password)
            return ['Missing password'];
        return [
            undefined,
            new LoginUserDto(email, password)
        ];
    }
}
exports.LoginUserDto = LoginUserDto;
