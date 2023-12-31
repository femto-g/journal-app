import { Pool, PoolConfig, QueryResult } from 'pg';
//const pgSession = require('connect-pg-simple');
import path from 'path';
import dotenv from 'dotenv';
import connectPgSimple from 'connect-pg-simple';
import session from 'express-session';
const envPath : string = path.resolve(__dirname, `../env/${process.env.NODE_ENV}.env`);
dotenv.config({path: envPath});

const nodeenv = process.env;

const poolOptions : PoolConfig = {
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT as number | undefined
};

const pool = new Pool(poolOptions);

export function query(text : string, params : any) : Promise<QueryResult<any>>;
export function query(text : string, params : any, callback: any) : void;
export function query(text : string, params : any, callback?: any) : void | Promise<QueryResult<any>> {

  if(callback !== undefined){
    return pool.query(text, params, callback);
  }
  else{
    return pool.query(text, params);
  }
};

export const createStore = (sess : typeof session ) => {
  const store = connectPgSimple(sess)
  return new store({
    pool: pool,
    createTableIfMissing: true
  });
};

export const close = () => {
  pool.end();
};
