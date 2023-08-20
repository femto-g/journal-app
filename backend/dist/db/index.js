"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.close = exports.createStore = exports.query = void 0;
const pg_1 = require("pg");
//const pgSession = require('connect-pg-simple');
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
const connect_pg_simple_1 = __importDefault(require("connect-pg-simple"));
const envPath = path_1.default.resolve(__dirname, `../env/${process.env.NODE_ENV}.env`);
dotenv_1.default.config({ path: envPath });
const nodeenv = process.env;
const poolOptions = {
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT
};
const pool = new pg_1.Pool(poolOptions);
const query = (text, params, callback) => {
    return pool.query(text, params, callback);
};
exports.query = query;
const createStore = (sess) => {
    const store = (0, connect_pg_simple_1.default)(sess);
    return new store({
        pool: pool,
        createTableIfMissing: true
    });
};
exports.createStore = createStore;
const close = () => {
    pool.end();
};
exports.close = close;
