"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteEventDto = void 0;
class DeleteEventDto {
    constructor(id, uid) {
        this.id = id;
        this.uid = uid;
    }
    static create({ id, uid }) {
        if (!id)
            return ['Missing id'];
        if (!uid)
            return ['Missing user id'];
        return [
            undefined,
            new DeleteEventDto(id, uid)
        ];
    }
}
exports.DeleteEventDto = DeleteEventDto;
