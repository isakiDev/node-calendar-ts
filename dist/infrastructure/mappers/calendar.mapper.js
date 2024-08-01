"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CalendarMapper = void 0;
const domain_1 = require("../../domain");
class CalendarMapper {
    static calendarEntityFromObject(object) {
        const { id, _id, start, end, notes = '', title, user } = object;
        if (!_id || !id) {
            throw new Error('Missing id');
        }
        if (!title)
            throw new Error('Missing title');
        if (!start)
            throw new Error('Missing start date');
        if (!end)
            throw new Error('Missing end date');
        if (!user)
            throw new Error('Missing user');
        return new domain_1.CalendarEntity(_id || id, title, notes, start, end, { id: user._id, name: user.name });
    }
}
exports.CalendarMapper = CalendarMapper;
