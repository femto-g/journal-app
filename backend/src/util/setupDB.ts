import * as db from '../db'

const createUsersTable = `CREATE TABLE users (
  user_id serial UNIQUE NOT NULL,
  username text NOT NULL,
  hashed_password bytea NOT NULL,
  salt bytea NOT NULL
)`;

const createEntriesTable = `CREATE TABLE entries (
  entry_id serial UNIQUE NOT NULL,
  content_html text NOT NULL,
  date timestamp with time zone NOT NULL,
  containing_journal integer NOT NULL,
  FOREIGN KEY(containing_journal)
  REFERENCES journals(journal_id)
  ON DELETE CASCADE
)`

const createJournalsTable = `CREATE TABLE journals (
  journal_id serial UNIQUE NOT NULL,
  title text NOT NULL,
  owner integer NOT NULL,
  FOREIGN KEY(owner)
  REFERENCES users(user_id)
  ON DELETE CASCADE
)`

const run = async () => {
  await db.query(createUsersTable, []);
  await db.query(createJournalsTable, []);
  await db.query(createEntriesTable, []);
}

run();
