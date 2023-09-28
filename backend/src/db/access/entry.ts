import { QueryResult } from 'pg';
import * as db from '../index';

export interface Entry {
  entry_id? : number;
  date : string;
  content_html: string;
  containing_journal: number;
}

export async function createEntry(entry : Entry) : Promise<QueryResult<any>>{

  const queryText : string = "INSERT into entries(content_html, date, containing_journal) VALUES ($1, $2, $3)";
  const params : Array<any> = [entry.content_html, entry.date, entry.containing_journal];
  const result = await db.query(queryText, params)!;
  
  return result;

}

export async function readEntries(containing_journal : number) : Promise<QueryResult<any>> {

  const queryText : string = "SELECT * FROM entries where containing_journal=($1) ORDER BY date";
  const params : Array<any> = [containing_journal];
  const result = await db.query(queryText, params)!;
  
  return result;
  
}

export async function updateEntry(id : number, content : string) : Promise<QueryResult<any>> {
  const queryText : string = "UPDATE entries SET content_html = ($1) WHERE entry_id = ($2)";
  const params : Array<any> = [content, id];
  const result = await db.query(queryText, params);

  return result;
}

