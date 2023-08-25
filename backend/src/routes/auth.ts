import express, { Router } from 'express';
export const router : Router = express.Router();
import * as db from '../db/index'
import passport from 'passport';
import passportLocal from 'passport-local';
import crypto from 'crypto';
import * as userAccess from '../db/access/user';

// helpful links 
// http://toon.io/understanding-passportjs-authentication-flow/
// https://github.com/jwalton/passport-api-docs#functions-added-to-the-request
// https://github.com/passport/todos-express-password/blob/master/routes/auth.js

const LocalStrategy = passportLocal.Strategy;

passport.use(new LocalStrategy(function verify(username, password, done) {
  //done() is the function passed to passport.authenticate()
  db.query('SELECT * FROM users WHERE username = $1', [ username ], function(err: any, result: { rows: any[]; }) {
    if (err) { 
      return done(err); 
    }

    const row = result.rows[0];

    if (!row) { 
      return done(null, false, { message: 'Incorrect username or password.' }); 
    }
    //console.log(row);
    crypto.pbkdf2(password, row.salt, 310000, 32, 'sha256', function(err, hashedPassword) {
      if (err) {
         return done(err); 
        }
      if (!crypto.timingSafeEqual(row.hashed_password, hashedPassword)) {
        return done(null, false, { message: 'Incorrect username or password.' });
      }
      return done(null, row);
    });
  });
}));

passport.serializeUser((user : any, done) => {
  done(null, {username: user.username});
});

passport.deserializeUser((user : any, done) => {
  //user parameter comes from req.session.passport.user
  done(null, user);
});

//may add options/callback here depending on what to do on fail or pass
router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err: any, user: Express.User, info: any) => {
    if(err){
      return next(err);
    }
    if(!user){
      res.sendStatus(401);
    }
    else{
      req.login(user, function(err) {
        if (err) {
          return next(err); 
        }
        res.sendStatus(200);
      });
    }
  })(req, res, next);
});

router.get('/logout', function(req, res, next) {
  req.logout(function(err) {
    if (err) {
      return next(err); 
    }
    res.sendStatus(200);
  });
});

router.post('/signup', function(req, res, next) {
  const salt = crypto.randomBytes(16);
  crypto.pbkdf2(req.body.password, salt, 310000, 32, 'sha256', function(err, hashedPassword) {
    if (err) { return next(err); }
    db.query('INSERT INTO users (username, hashed_password, salt) VALUES ($1, $2, $3)', 
    [req.body.username, hashedPassword, salt], 
      function(err: any) {
      if (err) { 
        return next(err); 
      }
      const user = {
        username: req.body.username
      };
      req.login(user, function(err) {
        if (err) {
          return next(err); 
        }
        res.sendStatus(200);
      });
    });
  });
});

router.get("/session", (req, res) => {
	
	if(!req.user){
		res.sendStatus(401);
		return;
	}

	res.json(req.user).status(200);
	return;
});
