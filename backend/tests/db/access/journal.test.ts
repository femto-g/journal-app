import '../../index';
import {createJournal, readJournals, Journal} from '../../../src/db/access/journal';
import crypto from 'crypto';
import {cryptoPbkdf2} from '../../../src/util/promisified'
import * as db from '../../../src/db/index';

describe('Testing journal data access', () => {

  const username = "oooooooooooooooooooooooo11122";
  const password = "0";
  let userID : number;

  beforeAll( async () => {
    //create a user
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

  });

  afterAll( async () => {
    //delete created user
    try {
      const queryText = 'DELETE FROM users';
      await db.query(queryText, []);

    } catch (error) {
      throw error;
    }finally {
      db.close();
    }
  });

  describe('Testing createJournal()', () => {

    const sometitle = "My super secret journal";

    beforeAll( async () => {
      const someJournal : Journal = {
        title : sometitle,
        owner : userID
      }
      try {
        createJournal(someJournal);
      } catch (error) {
        throw error;
      }
    });
    
    afterAll( async () => {
      try {
        const queryText = "DELETE FROM journals";
        await db.query(queryText, []);   
      } catch (error) {
        throw error;
      }
    });

    it('Should insert a journal', async () => {
      try {
        const queryText = 'SELECT * FROM journals';
        const result = await db.query(queryText, []);
        const rowCount = result.rows.length;
        expect(rowCount).toEqual(1);
        const row = result.rows[0];

        expect(row).toHaveProperty('title', sometitle);
        expect(row).toHaveProperty('owner', userID);

      } catch (error) {
        throw error;
      }
    });
  });

  describe('Testing readJournals()', () => {

    const sometitle = "My super secret journal";

    beforeAll( async () => {

      try {
        const queryText = 'INSERT into journals (title, owner) VALUES ($1, $2)';
        const params = [sometitle, userID];
        await db.query(queryText, params);
      } catch (error) {
        throw error;
      }
    });
    
    afterAll( async () => {
      try {
        const queryText = "DELETE FROM journals";
        await db.query(queryText, []);   
      } catch (error) {
        throw error;
      }
    });

    it('Should read 1 journal from the database', async () => {
      try {
        const result = await readJournals(userID);
        const rowCount = result.rows.length;
        expect(rowCount).toEqual(1);
        const row = result.rows[0];
        expect(row).toHaveProperty('journal_id');
        expect(row).toHaveProperty('title', sometitle);
        expect(row).toHaveProperty('owner', userID);
      } catch (error) {
        throw error;
      }
    })

  })

});