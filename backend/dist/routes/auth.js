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
exports.router = void 0;
const express_1 = __importDefault(require("express"));
exports.router = express_1.default.Router();
const db = __importStar(require("../db/index"));
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = __importDefault(require("passport-local"));
const crypto_1 = __importDefault(require("crypto"));
// helpful links 
// http://toon.io/understanding-passportjs-authentication-flow/
// https://github.com/jwalton/passport-api-docs#functions-added-to-the-request
// https://github.com/passport/todos-express-password/blob/master/routes/auth.js
const LocalStrategy = passport_local_1.default.Strategy;
passport_1.default.use(new LocalStrategy(function verify(username, password, done) {
    //done() is the function passed to passport.authenticate()
    db.query('SELECT * FROM users WHERE username = $1', [username], function (err, result) {
        if (err) {
            return done(err);
        }
        const row = result.rows[0];
        if (!row) {
            return done(null, false, { message: 'Incorrect username or password.' });
        }
        //console.log(row);
        crypto_1.default.pbkdf2(password, row.salt, 310000, 32, 'sha256', function (err, hashedPassword) {
            if (err) {
                return done(err);
            }
            if (!crypto_1.default.timingSafeEqual(row.hashed_password, hashedPassword)) {
                return done(null, false, { message: 'Incorrect username or password.' });
            }
            return done(null, row);
        });
    });
}));
passport_1.default.serializeUser((user, done) => {
    done(null, { username: user.username });
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
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        res.sendStatus(200);
    });
});
exports.router.post('/signup', function (req, res, next) {
    const salt = crypto_1.default.randomBytes(16);
    crypto_1.default.pbkdf2(req.body.password, salt, 310000, 32, 'sha256', function (err, hashedPassword) {
        if (err) {
            return next(err);
        }
        db.query('INSERT INTO users (username, hashed_password, salt) VALUES ($1, $2, $3)', [req.body.username, hashedPassword, salt], function (err) {
            if (err) {
                return next(err);
            }
            const user = {
                username: req.body.username
            };
            req.login(user, function (err) {
                if (err) {
                    return next(err);
                }
                res.sendStatus(200);
            });
        });
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
