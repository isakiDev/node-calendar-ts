"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.corsAdapter = void 0;
const cors_1 = __importDefault(require("cors"));
const ACCEPTED_ORIGINS = ['https://isakidev-calendar.netlify.app', 'http://isakidev-calendar.netlify.app'];
const corsAdapter = ({ acceptedOrigins = ACCEPTED_ORIGINS } = {}) => (0, cors_1.default)({
    origin: (origin, callback) => {
        if (!origin || (acceptedOrigins === null || acceptedOrigins === void 0 ? void 0 : acceptedOrigins.includes(origin))) {
            callback(null, true);
            return;
        }
        callback(new Error('Not allowed by Cors'));
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH', 'HEAD'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    credentials: true
});
exports.corsAdapter = corsAdapter;
