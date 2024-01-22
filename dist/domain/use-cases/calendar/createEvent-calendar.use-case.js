"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateEvent = void 0;
const custom_error_1 = require("../../errors/custom.error");
class CreateEvent {
    constructor(calendarRepository) {
        this.calendarRepository = calendarRepository;
    }
    execute(createEventDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const event = yield this.calendarRepository.createEvent(createEventDto);
            if (!event)
                throw custom_error_1.CustomError.badRequest('Event not created');
            return {
                id: event.id,
                title: event.title,
                start: event.start,
                notes: event.notes,
                end: event.end,
                user: {
                    id: event.user.id
                }
            };
        });
    }
}
exports.CreateEvent = CreateEvent;
