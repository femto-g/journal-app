"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//config dotenv here
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
const envPath = path_1.default.resolve(__dirname, `../env/${process.env.NODE_ENV}.env`);
dotenv_1.default.config({ path: envPath });
const _1 = require(".");
const port = process.env.PORT;
_1.httpServer.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
});
