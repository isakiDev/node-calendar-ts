"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateEventDto = void 0;
class CreateEventDto {
    constructor(end, notes, start, title, user) {
        this.end = end;
        this.notes = notes;
        this.start = start;
        this.title = title;
        this.user = user;
    }
    static create({ title, end, notes = '', start, uid }) {
        if (!title)
            return ['Missing title'];
        if (!start)
            return ['Missing start date'];
        if (!end)
            return ['Missing end date'];
        if (!uid)
            return ['Missing user'];
        return [
            undefined,
            new CreateEventDto(end, notes, start, title, uid)
        ];
    }
}
exports.CreateEventDto = CreateEventDto;
