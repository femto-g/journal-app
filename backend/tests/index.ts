//Set to use the 'test.env' environment variables when npm test is called with cross-env
//Import this at the beginning of any test file
import path from 'path';
import dotenv from 'dotenv';
const envPath = path.resolve(__dirname, `../env/${process.env.NODE_ENV}.env`);
dotenv.config({path: envPath});