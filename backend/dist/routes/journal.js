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
const journal_1 = require("../db/access/journal");
require("../util/types/index");
exports.router.get('/journals', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user) {
        return next(new Error('Not authenticated'));
    }
    const owner = req.user.user_id;
    try {
        const result = yield (0, journal_1.readJournals)(owner);
        const journals = result.rows;
        return res.json(journals);
    }
    catch (error) {
        return next(error);
    }
}));
exports.router.post('/journal', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user) {
        return next(new Error('Not authenticated'));
    }
    if (!req.body || !req.body.title) {
        return next(new Error('No title in body'));
    }
    const journal = { owner: req.user.user_id, title: req.body.title };
    try {
        yield (0, journal_1.createJournal)(journal);
        return res.sendStatus(200);
    }
    catch (error) {
        return next(error);
    }
}));
