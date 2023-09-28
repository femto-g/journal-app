import path from 'path';
import dotenv from 'dotenv';
const envPath = path.resolve(__dirname, `../env/${process.env.NODE_ENV}.env`);
dotenv.config({path: envPath});
import request from 'supertest';
import { app, httpServer} from '../src/index';
import * as db from '../src/db/index';
import crypto from 'crypto';



describe('Testing server', () => {

  describe('Testing express routes/middleware', () => {

    it('test /session route', async () => {
      const response = await request(app).get('/session');
      expect(response.status).toEqual(401);
    })

  })


  describe('Testing authentication', () => {
    const [existingUsername, existingPassword, newUsername, newPassword] = ["bobby", "bobpass", "gary", "garypass"];
    const salt = crypto.randomBytes(16);
    
    beforeAll((done) => {

      crypto.pbkdf2(existingPassword, salt, 310000, 32, 'sha256', function(err, hashedPassword) {
        if(err){
          done(err);
        }
        db.query('INSERT INTO users (username, hashed_password, salt) VALUES ($1, $2, $3)',
        [existingUsername, hashedPassword, salt],
        (err: any) => {
          if(err){
            done(err);
          }
          done();
        });
      });

      

    });

    afterAll((done) => {
      db.query('DELETE FROM users WHERE (username) = ($1) or (username) = ($2)',
        [existingUsername, newUsername],
        (err: any) => {
          db.close()
          if(err){
            done(err);
          }
        });


      done();

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