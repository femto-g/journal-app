//config dotenv here
import path from 'path';
import dotenv from 'dotenv';
const envPath : string = path.resolve(__dirname, `../env/${process.env.NODE_ENV}.env`);
dotenv.config({path: envPath});
import { httpServer } from '.';
const port = process.env.PORT;

httpServer.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});