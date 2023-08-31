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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_promise_router_1 = __importDefault(require("express-promise-router"));
exports.router = (0, express_promise_router_1.default)();
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = __importDefault(require("passport-local"));
const crypto_1 = __importDefault(require("crypto"));
const userAccess = __importStar(require("../db/access/user"));
const util_1 = __importDefault(require("util"));
// helpful links 
// http://toon.io/understanding-passportjs-authentication-flow/
// https://github.com/jwalton/passport-api-docs#functions-added-to-the-request
// https://github.com/passport/todos-express-password/blob/master/routes/auth.js
const LocalStrategy = passport_local_1.default.Strategy;
const cryptoPbkdf2 = util_1.default.promisify(crypto_1.default.pbkdf2);
passport_1.default.use(new LocalStrategy(function verify(username, password, done) {
    return __awaiter(this, void 0, void 0, function* () {
        //done() is the function passed to passport.authenticate()
        try {
            const result = yield userAccess.readUser(username);
            if (result.rows.length === 0) {
                return done(null, false);
            }
            const row = result.rows[0];
            const hashedPassword = yield cryptoPbkdf2(password, row.salt, 310000, 32, 'sha256');
            if (!crypto_1.default.timingSafeEqual(row.hashed_password, hashedPassword)) {
                return done(null, false, { message: 'Incorrect username or password.' });
            }
            return done(null, row);
        }
        catch (error) {
            return done(error);
        }
    });
}));
passport_1.default.serializeUser((user, done) => {
    const serializedUser = {
        username: user.username,
        user_id: user.user_id
    };
    done(null, serializedUser);
});
passport_1.default.deserializeUser((user, done) => {
    //user parameter comes from req.session.passport.user
    done(null, user);
});
//may add options/callback here depending on what to do on fail or pass
exports.router.post('/login', (req, res, next) => {
    passport_1.default.authenticate('local', (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            res.sendStatus(401);
        }
        else {
            req.login(user, function (err) {
                if (err) {
                    return next(err);
                }
                res.sendStatus(200);
            });
        }
    })(req, res, next);
});
exports.router.get('/logout', function (req, res, next) {
    const logout = util_1.default.promisify(req.logout);
    try {
        logout();
    }
    catch (error) {
        return next(error);
    }
    res.sendStatus(200);
    // req.logout(function(err) {
    //   if (err) {
    //     return next(err); 
    //   }
    //   res.sendStatus(200);
    // });
});
exports.router.post('/signup', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const login = util_1.default.promisify(req.login);
        const salt = crypto_1.default.randomBytes(16);
        const username = req.body.username;
        try {
            //to avoid duplicae key constraint db error
            const result = yield userAccess.readUser(username);
            if (result.rows.length > 0) {
                return res.sendStatus(401);
            }
            const hashed_password = yield cryptoPbkdf2(req.body.password, salt, 310000, 32, 'sha256');
            const user = {
                username,
                hashed_password,
                salt
            };
            yield userAccess.createUser(user);
            const passport_user = {
                username
            };
            yield login(user);
            //maybe add logging here?
            return res.sendStatus(200);
            // req.login(user, function(err) {
            //   if (err) {
            //     return next(err); 
            //   }
            //   res.sendStatus(200);
            // });
        }
        catch (error) {
            return next(error);
        }
    });
});
exports.router.get("/session", (req, res) => {
    if (!req.user) {
        res.sendStatus(401);
        return;
    }
    res.json(req.user).status(200);
    return;
});
