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
exports.CalendarController = void 0;
const domain_1 = require("../../domain");
class CalendarController {
    constructor(calendarRepository) {
        this.calendarRepository = calendarRepository;
        this.createEvent = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const data = Object.assign(Object.assign({}, req.body), { user: req.body.user.uid });
            const [error, createEventDto] = domain_1.CreateEventDto.create(data);
            if (error)
                return res.status(400).json({ error });
            new domain_1.CreateEvent(this.calendarRepository)
                .execute(createEventDto)
                .then(data => res.json(data))
                .catch(error => this.handleError(error, res));
        });
        this.updateEvent = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const data = Object.assign(Object.assign({}, req.body), { id, user: req.body.user.uid });
            const [error, updateEventDto] = domain_1.UpdateEventDto.create(data);
            if (error)
                return res.status(400).json({ error });
            new domain_1.UpdateEvent(this.calendarRepository)
                .execute(updateEventDto)
                .then(data => res.json(data))
                .catch(error => this.handleError(error, res));
        });
        this.deleteEvent = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { uid } = req.body.user;
            const [error, deleteEventDto] = domain_1.DeleteEventDto.create({ id, uid });
            if (error)
                return res.status(400).json({ error });
            new domain_1.DeleteEvent(this.calendarRepository)
                .execute(deleteEventDto)
                .then(data => res.json(data))
                .catch(error => this.handleError(error, res));
        });
        this.getEvents = (req, res) => __awaiter(this, void 0, void 0, function* () {
            new domain_1.GetEvents(this.calendarRepository)
                .execute()
                .then(data => res.json(data))
                .catch(error => this.handleError(error, res));
        });
    }
    handleError(error, res) {
        if (error instanceof domain_1.CustomError) {
            return res.status(error.statusCode).json({ error: error.message });
        }
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
exports.CalendarController = CalendarController;
