"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cryptoPbkdf2 = void 0;
const crypto_1 = __importDefault(require("crypto"));
const util_1 = __importDefault(require("util"));
exports.cryptoPbkdf2 = util_1.default.promisify(crypto_1.default.pbkdf2);
