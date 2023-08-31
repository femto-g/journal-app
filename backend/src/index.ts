import express, { Express, Request, Response } from 'express';
export const app : Express = express();
import http from "http";
import session from "express-session";
import cors, { CorsOptions } from 'cors';
export const httpServer = http.createServer(app);
import * as db from './db/index';
const pgStore = db.createStore(session);
//import {router as authRouter} from './routes/auth';
import {router as authRouter} from './routes/new_auth';
import {router as journalRouter} from './routes/journal';
import {router as entryRouter} from './routes/entry';
import bodyParser from 'body-parser';
import passport from 'passport';

if(process.env.NODE_ENV === 'prod'){
	app.set('trust proxy', true);
}
const corsOptions : CorsOptions = {
	origin: process.env.CLIENT_URL,
	credentials: true
}

app.use(cors(corsOptions));
app.use(bodyParser.json());

const sessionOptions : session.SessionOptions = {
	secret: process.env.EXPRESS_SESSION_SECRET || 'keyboard cat', 
	cookie: { 
	 maxAge: 1000 * 60 * 30,
	 secure: process.env.NODE_ENV === 'prod' ? true : false,
	 sameSite: process.env.NODE_ENV === 'prod' ? "none": "lax" as boolean | "none" | "lax" | "strict" | undefined
	 },
	resave: false,
	saveUninitialized: true,
	store: pgStore
	}

const sessionMiddleware = session(sessionOptions);

app.use(sessionMiddleware);
app.use(passport.initialize());
app.use(passport.session());


app.use("/", authRouter);
app.use("/", journalRouter);
app.use("/", entryRouter);

app.use((err: { stack: any; }, req : Request, res : Response, next: any) => {
	console.log(err.stack);
  return res.sendStatus(500);
})
