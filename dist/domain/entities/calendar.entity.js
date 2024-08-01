"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CalendarEntity = void 0;
class CalendarEntity {
    constructor(id, title, notes, start, end, user) {
        this.id = id;
        this.title = title;
        this.notes = notes;
        this.start = start;
        this.end = end;
        this.user = user;
    }
}
exports.CalendarEntity = CalendarEntity;
