import { error } from 'console';
import * as db from '../index';
import { QueryResult } from 'pg';


export interface Journal {
  journal_id?: number;
  title: string;
  owner: number;
}

export async function createJournal(journal : Journal) : Promise<QueryResult<any>> {

  const queryText : string = "INSERT into journals(title, owner) VALUES ($1, $2)";

  const params : Array<any> = [journal.title, journal.owner];
  const result = await db.query(queryText, params);

  return result!;
}

export async function readJournals(owner : number) : Promise<QueryResult<any>> {

  const queryText : string = "SELECT * FROM journals where owner=($1)";
  const params : Array<any> = [owner];
  const result = await db.query(queryText, params);
  
  return result!;
  
}

// export function updateJournal {
  
// }

// export function deleteJournal {
  
// }

