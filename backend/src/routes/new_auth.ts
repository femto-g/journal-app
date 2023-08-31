import Router from 'express-promise-router';
export const router = Router();
import * as db from '../db/index'
import passport from 'passport';
import passportLocal from 'passport-local';
import crypto from 'crypto';
import * as userAccess from '../db/access/user';
import util from 'util';

// helpful links 
// http://toon.io/understanding-passportjs-authentication-flow/
// https://github.com/jwalton/passport-api-docs#functions-added-to-the-request
// https://github.com/passport/todos-express-password/blob/master/routes/auth.js

const LocalStrategy = passportLocal.Strategy;

const cryptoPbkdf2 = util.promisify(crypto.pbkdf2);

passport.use(new LocalStrategy(async function verify(username, password, done) {
  //done() is the function passed to passport.authenticate()
  try {
    const result = await userAccess.readUser(username);
    if(result.rows.length === 0){
      return done(null, false);
    }
    const row : userAccess.User = result.rows[0];
    const hashedPassword = await cryptoPbkdf2(password, row.salt, 310000, 32, 'sha256');
    if (!crypto.timingSafeEqual(row.hashed_password, hashedPassword)) {
      return done(null, false, { message: 'Incorrect username or password.' });
    }
    return done(null, row);

  } catch (error) {
    return done(error);
  }

}));

passport.serializeUser((user : any, done) => {
  const serializedUser = {
    username: user.username,
    user_id: user.user_id
  }
  done(null, serializedUser);
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
  const logout = util.promisify(req.logout);
  try {
    logout();
  } catch (error) {
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

router.post('/signup', async function(req, res, next) {
  const login = util.promisify(req.login);
  const salt = crypto.randomBytes(16);
  const username = req.body.username;
  try {
    //to avoid duplicae key constraint db error
    const result = await userAccess.readUser(username);
    if(result.rows.length > 0){
      return res.sendStatus(401);
    }
    const hashed_password = await cryptoPbkdf2(req.body.password, salt, 310000, 32, 'sha256');
    const user : userAccess.User = {
      username,
      hashed_password,
      salt
    }
    await userAccess.createUser(user);
    const passport_user = {
      username
    }
    await login(user);
    //maybe add logging here?
    return res.sendStatus(200);
    // req.login(user, function(err) {
    //   if (err) {
    //     return next(err); 
    //   }
    //   res.sendStatus(200);
    // });
    
    
  } catch (error) {
    return next(error);
  }

});

router.get("/session", (req, res) => {
	
	if(!req.user){
		res.sendStatus(401);
		return;
	}

	res.json(req.user).status(200);
	return;
});
