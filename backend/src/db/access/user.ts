import * as db from '../index';
import { QueryResult } from 'pg';


export interface User {
  user_id?: number;
  username: string;
  hashed_password: any;
  salt: any;
}


export async function createUser(user : User) : Promise<QueryResult<any>> {

  const queryText : string = "INSERT INTO users (username, hashed_password, salt) VALUES ($1, $2, $3)";
  const params : Array<any> = [user.username, user.hashed_password, user.salt];
  const result = await db.query(queryText, params);

  return result!;
}

export async function readUser(username : string) : Promise<QueryResult<any>> {

  const queryText : string = "SELECT * FROM users WHERE username = $1";
  const params : Array<any> = [username];
  const result = await db.query(queryText, params);
  
  return result!;
  
}