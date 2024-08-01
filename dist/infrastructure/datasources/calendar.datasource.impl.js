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
exports.CalendarDatasourceImpl = void 0;
const mongo_1 = require("../../data/mongo");
const domain_1 = require("../../domain");
const calendar_mapper_1 = require("../mappers/calendar.mapper");
class CalendarDatasourceImpl {
    getEvents() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const events = yield mongo_1.EventModel
                    .find()
                    .populate('user', 'name');
                // if (events.length <= 0) throw CustomError.notFound('Events not found')
                return events.map(event => calendar_mapper_1.CalendarMapper.calendarEntityFromObject(event));
            }
            catch (error) {
                console.log({ error });
                if (error instanceof domain_1.CustomError) {
                    throw error;
                }
                throw domain_1.CustomError.internalServer();
            }
        });
    }
    createEvent(createEventDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const event = yield mongo_1.EventModel.create(createEventDto);
                yield event.save();
                return calendar_mapper_1.CalendarMapper.calendarEntityFromObject(event);
            }
            catch (error) {
                console.log(error);
                if (error instanceof domain_1.CustomError) {
                    throw error;
                }
                throw domain_1.CustomError.internalServer();
            }
        });
    }
    updateEvent(updateEventDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, user: uid } = updateEventDto;
            try {
                const event = yield mongo_1.EventModel.findById(id);
                if (!event)
                    throw domain_1.CustomError.badRequest('Event not exists');
                if (event.user.toString() !== uid)
                    throw domain_1.CustomError.unauthorized('You do not have privileges to update');
                const newEvent = Object.assign({}, updateEventDto);
                const eventUpdated = yield mongo_1.EventModel.findByIdAndUpdate(id, newEvent, { new: true });
                if (!eventUpdated)
                    throw domain_1.CustomError.internalServer();
                return calendar_mapper_1.CalendarMapper.calendarEntityFromObject(eventUpdated);
            }
            catch (error) {
                if (error instanceof domain_1.CustomError) {
                    throw error;
                }
                throw domain_1.CustomError.internalServer();
            }
        });
    }
    deleteEvent(deleteEventDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, user: uid } = deleteEventDto;
            try {
                const event = yield mongo_1.EventModel.findById(id);
                if (!event)
                    throw domain_1.CustomError.notFound(`Event with id ${id} not found`);
                if ((event === null || event === void 0 ? void 0 : event.user.toString()) !== uid)
                    throw domain_1.CustomError.unauthorized('You do not have privileges to delete');
                const eventDeleted = yield mongo_1.EventModel.findByIdAndDelete(id);
                return calendar_mapper_1.CalendarMapper.calendarEntityFromObject(eventDeleted);
            }
            catch (error) {
                if (error instanceof domain_1.CustomError) {
                    throw error;
                }
                throw domain_1.CustomError.internalServer();
            }
        });
    }
}
exports.CalendarDatasourceImpl = CalendarDatasourceImpl;
