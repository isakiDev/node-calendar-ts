"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteEventDto = void 0;
class DeleteEventDto {
    constructor(id, user) {
        this.id = id;
        this.user = user;
    }
    static create({ id, uid }) {
        if (!id)
            return ['Missing id'];
        if (!uid)
            return ['Missing user'];
        return [
            undefined,
            new DeleteEventDto(id, uid)
        ];
    }
}
exports.DeleteEventDto = DeleteEventDto;
