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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_promise_router_1 = __importDefault(require("express-promise-router"));
exports.router = (0, express_promise_router_1.default)();
const entry_1 = require("../db/access/entry");
require("../util/types/index");
exports.router.get('/entries', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user) {
        return next(new Error('Not authenticated'));
    }
    const containing_journal = req.body.journal_id;
    try {
        const result = yield (0, entry_1.readEntries)(containing_journal);
        const entries = result.rows;
        return res.json(entries);
    }
    catch (error) {
        return next(error);
    }
}));
exports.router.post('/entry', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user) {
        return next(new Error('Not authenticated'));
    }
    if (!req.body || !req.body.date || !req.body.content_html || !req.body.containing_journal) {
        return next(new Error('No body or shape of entry is wrong'));
    }
    const entry = {
        date: req.body.date,
        content_html: req.body.content_html,
        containing_journal: req.body.containing_journal
    };
    try {
        yield (0, entry_1.createEntry)(entry);
        return res.sendStatus(200);
    }
    catch (error) {
        return next(error);
    }
}));
exports.router.post('/update-entry', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user) {
        return next(new Error('Not authenticated'));
    }
    if (!req.body || !req.body.entry_id || !req.body.content_html) {
        return next(new Error('No body or shape of body is wrong'));
    }
    try {
        yield (0, entry_1.updateEntry)(req.body.entry_id, req.body.content_html);
        return res.sendStatus(200);
    }
    catch (error) {
        return next(error);
    }
}));
