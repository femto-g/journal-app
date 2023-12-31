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
const db = __importStar(require("../db"));
const createUsersTable = `CREATE TABLE users (
  user_id serial UNIQUE NOT NULL,
  username text NOT NULL,
  hashed_password bytea NOT NULL,
  salt bytea NOT NULL
)`;
const createEntriesTable = `CREATE TABLE entries (
  entry_id serial UNIQUE NOT NULL,
  content_html text NOT NULL,
  date timestamp with time zone NOT NULL,
  containing_journal integer NOT NULL,
  FOREIGN KEY(containing_journal)
  REFERENCES journals(journal_id)
  ON DELETE CASCADE
)`;
const createJournalsTable = `CREATE TABLE journals (
  journal_id serial UNIQUE NOT NULL,
  title text NOT NULL,
  owner integer NOT NULL,
  FOREIGN KEY(owner)
  REFERENCES users(user_id)
  ON DELETE CASCADE
)`;
const run = () => __awaiter(void 0, void 0, void 0, function* () {
    yield db.query(createUsersTable, []);
    yield db.query(createJournalsTable, []);
    yield db.query(createEntriesTable, []);
});
run();
