"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RevalidateTokenDto = void 0;
class RevalidateTokenDto {
    constructor(uid, name) {
        this.uid = uid;
        this.name = name;
    }
    static create({ uid, name }) {
        if (!uid)
            return ['Missing uid'];
        if (!name)
            return ['Missing name'];
        return [
            undefined,
            new RevalidateTokenDto(uid, name)
        ];
    }
}
exports.RevalidateTokenDto = RevalidateTokenDto;
