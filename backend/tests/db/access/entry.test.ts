import '../../index';
import {createEntry, readEntries, Entry} from '../../../src/db/access/entry'
import crypto from 'crypto';
import {cryptoPbkdf2} from '../../../src/util/promisified'
import * as db from '../../../src/db/index';

describe('Testing entry data access', () => {

  const username = "oooooooooooooooooooooooo111";
  const password = "0";
  const journalTitle = "Some arbitrary title for a journal";
  let journalID : number;
  
  beforeAll( async () => {
    //create a user
    let userID;
    try {
      const queryText = 'INSERT INTO users (username, hashed_password, salt) VALUES ($1, $2, $3) RETURNING *';
      const salt = crypto.randomBytes(16);
      const hashedPassword = await cryptoPbkdf2(password, salt, 310000, 32, 'sha256');
      const params = [username, hashedPassword, salt];
      const result = await db.query(queryText, params);
      userID = result.rows[0].user_id;
    } catch (error) {
      throw error;
    }
    //create a journal
    try{
      const queryText : string = "INSERT into journals(title, owner) VALUES ($1, $2) RETURNING *";
      const params : Array<any> = [journalTitle, userID];
      const result = await db.query(queryText, params);
      journalID = result!.rows[0].journal_id;
    } catch(error){
      throw error;
    }

  });

  afterAll( async () => {
    //delete created user
    try {
      const queryText = 'DELETE FROM users WHERE username = ($1)';
      const params = [username];
      await db.query(queryText, params);

    } catch (error) {
      throw error;
    }
    //delete created journal
    try {
      const queryText = 'DELETE FROM journals WHERE title = ($1)';
      const params = [journalTitle];
      await db.query(queryText, params);
    } catch (error) {
      throw error;
    } finally{
      db.close();
    }

  });

  describe('Testing createEntry()', () => {
    const currentTime = new Date().toISOString();
    const some_html = "<div>Testing</div>";

    beforeAll( async () => {
      try {
        const entry : Entry = {
          date: currentTime,
          content_html: some_html,
          containing_journal: journalID
        }
        await createEntry(entry);
        
      } catch (error) {
        throw error;
      }

    })

    afterAll( async () => {
      try {
        const queryText = 'DELETE FROM entries WHERE date = ($1) AND content_html = ($2) AND containing_journal = ($3)';
        const params = [currentTime, some_html, journalID];
        const result = await db.query(queryText, params);
      } catch (error) {
        throw error;
      } 
    })

    it('Should create an entry in the database when called', async () => {

      try {
        const queryText = 'SELECT * FROM entries WHERE date = ($1) AND content_html = ($2) AND containing_journal = ($3)';
        const params = [currentTime, some_html, journalID];
        const result = await db.query(queryText, params);
        const row = result.rows[0];

        expect(row).toHaveProperty('date');
        const compareDate = new Date(row.date);
        expect(compareDate.toISOString()).toEqual(currentTime);
        expect(row).toHaveProperty('content_html', some_html);
        expect(row).toHaveProperty('containing_journal', journalID);

      } catch (error) {
        throw error;
      }

    });

  });

  describe('Testing readEntries()', () => {

    const currentTime = new Date().toISOString();
    const some_html = "<div>Testing</div>";
    
    beforeAll( async () => {

      try {
        const queryText = "INSERT into entries(content_html, date, containing_journal) VALUES ($1, $2, $3)";
        const params = [some_html, currentTime, journalID];
        await db.query(queryText, params);
      } catch (error) {
        throw error;
      }
    });

    afterAll(async () => {
      try {
        const queryText = 'DELETE FROM entries WHERE date = ($1) AND content_html = ($2) AND containing_journal = ($3)';
        const params = [currentTime, some_html, journalID];
        const result = await db.query(queryText, params);
      } catch (error) {
        throw error;
      } 

    });

    it('Should get 1 entry back from the database', async ()=> {
      try {
        const result = await readEntries(journalID);
        const row = result.rows[0];

        expect(row).toHaveProperty('date');
        const compareDate = new Date(row.date);
        expect(compareDate.toISOString()).toEqual(currentTime);
        expect(row).toHaveProperty('content_html', some_html);
        expect(row).toHaveProperty('containing_journal', journalID);
      } catch (error) {
        throw error;
      }
    })
  });




})