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
exports.updateEntry = exports.readEntries = exports.createEntry = void 0;
const db = __importStar(require("../index"));
function createEntry(entry) {
    return __awaiter(this, void 0, void 0, function* () {
        const queryText = "INSERT into entries(content_html, date, containing_journal) VALUES ($1, $2, $3)";
        const params = [entry.content_html, entry.date, entry.containing_journal];
        const result = yield db.query(queryText, params);
        return result;
    });
}
exports.createEntry = createEntry;
function readEntries(containing_journal) {
    return __awaiter(this, void 0, void 0, function* () {
        const queryText = "SELECT * FROM entries where containing_journal=($1)";
        const params = [containing_journal];
        const result = yield db.query(queryText, params);
        return result;
    });
}
exports.readEntries = readEntries;
function updateEntry(id, content) {
    return __awaiter(this, void 0, void 0, function* () {
        const queryText = "UPDATE entries SET content_html = ($1) WHERE entry_id = ($2)";
        const params = [content, id];
        const result = yield db.query(queryText, params);
        return result;
    });
}
exports.updateEntry = updateEntry;
