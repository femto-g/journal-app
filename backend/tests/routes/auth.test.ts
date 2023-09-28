import '../index';
import request from 'supertest';
import { app, httpServer} from '../../src/index';
import * as db from '../../src/db/index';
import crypto from 'crypto';
import util from 'util';

const cryptoPbkdf2 = util.promisify(crypto.pbkdf2);


describe('Testing server', () => {

  describe('Testing express routes/middleware', () => {

    it('test /session route', async () => {
      const response = await request(app).get('/session');
      expect(response.status).toEqual(401);
    })

  })


  describe('Testing authentication', () => {
    const [existingUsername, existingPassword, newUsername, newPassword] = ["bobbkhlkhkjhy", "blkjjhlkhlkhobpass", "gallkj;lj;lkjlry", "garkjhlnhiyugfuybfuypass"];
    const salt = crypto.randomBytes(16);
    
    beforeAll( async () => {

      try {
        const hashedPassword = await cryptoPbkdf2(existingPassword, salt, 310000, 32, 'sha256');
        const queryText = 'INSERT INTO users (username, hashed_password, salt) VALUES ($1, $2, $3)';
        const params = [existingUsername, hashedPassword, salt];
        await db.query(queryText, params);

      } catch (error) {
        throw error;
      }
    });

    afterAll( async () => {

      const queryText = 'DELETE FROM users WHERE (username) = ($1) or (username) = ($2)';
      const params = [existingUsername, newUsername];
      try {
        await db.query(queryText, params);
      } catch (error) {
        throw error;
      } finally{
        db.close();
      }
    });

    describe('When credentials exist', () => {

      it('should be OK on login', async () => {
        const response = await request(app)
        .post("/login")
        .set('Content-Type', 'application/json')
        .send({username: existingUsername, password: existingPassword});
        expect(response.ok).toBeTruthy;
       
      
      })

      it('should not be OK on signup', async () => {

        const response = await request(app)
        .post("/signup")
        .set('Content-Type', 'application/json')
        .send({username: existingUsername, password: existingPassword});
        expect(response.ok).toBeFalsy;

      })

    })

    describe('When credentials do not exist', () => {

      it('should not be OK on login', async () => {

        const response = await request(app)
        .post("/login")
        .set('Content-Type', 'application/json')
        .send({username: newUsername, password: newPassword});
        expect(response.ok).toBeFalsy;
      
      })

      it('should be OK on sign up', async () => {

        const response = await request(app)
        .post("/signup")
        .set('Content-Type', 'application/json')
        .send({username: newUsername, password: newPassword});
        expect(response.status).toBeTruthy;
      
      })

    })


  })

})