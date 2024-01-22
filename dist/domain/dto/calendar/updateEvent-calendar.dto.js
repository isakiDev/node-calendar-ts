"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateEventDto = void 0;
class UpdateEventDto {
    constructor(id, title, notes, start, end, user) {
        this.id = id;
        this.title = title;
        this.notes = notes;
        this.start = start;
        this.end = end;
        this.user = user;
    }
    static create({ id, end, notes, start, title, user }) {
        if (!id)
            return ['Missing id'];
        if (!end)
            return ['Missing end date'];
        if (!end)
            return ['Missing start date'];
        if (!end)
            return ['Missing title'];
        if (!end)
            return ['Missing user'];
        return [
            undefined,
            new UpdateEventDto(id, title, notes, start, end, user)
        ];
    }
}
exports.UpdateEventDto = UpdateEventDto;
