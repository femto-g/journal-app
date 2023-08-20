"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.httpServer = exports.app = void 0;
const express_1 = __importDefault(require("express"));
exports.app = (0, express_1.default)();
const http_1 = __importDefault(require("http"));
const express_session_1 = __importDefault(require("express-session"));
const cors_1 = __importDefault(require("cors"));
exports.httpServer = http_1.default.createServer(exports.app);
const db = __importStar(require("./db/index"));
const pgStore = db.createStore(express_session_1.default);
const auth_1 = require("./routes/auth");
const body_parser_1 = __importDefault(require("body-parser"));
const passport_1 = __importDefault(require("passport"));
if (process.env.NODE_ENV === 'prod') {
    exports.app.set('trust proxy', true);
}
const corsOptions = {
    origin: process.env.CLIENT_URL,
    credentials: true
};
exports.app.use((0, cors_1.default)(corsOptions));
exports.app.use(body_parser_1.default.json());
const sessionOptions = {
    secret: process.env.EXPRESS_SESSION_SECRET || 'keyboard cat',
    cookie: {
        maxAge: 1000 * 60 * 30,
        secure: process.env.NODE_ENV === 'prod' ? true : false,
        sameSite: process.env.NODE_ENV === 'prod' ? "none" : "lax"
    },
    resave: false,
    saveUninitialized: true,
    store: pgStore
};
const sessionMiddleware = (0, express_session_1.default)(sessionOptions);
exports.app.use(sessionMiddleware);
exports.app.use(passport_1.default.initialize());
exports.app.use(passport_1.default.session());
exports.app.use("/", auth_1.router);
exports.app.use((err, req, res, next) => {
    console.log(err.stack);
    return res.sendStatus(500);
});
module.exports = { app: exports.app, httpServer: exports.httpServer, db };
