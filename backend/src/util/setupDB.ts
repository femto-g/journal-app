import * as db from '../db'

const createUsersTable = `CREATE TABLE users (
  user_id integer UNIQUE NOT NULL,
  username text NOT NULL,
  hashed_password bytea NOT NULL,
  salt bytea NOT NULL
);`;

const createEntriesTable = `CREATE TABLE entries (
  entry_id integer UNIQUE NOT NULL,
  content_html text NOT NULL,
  date timestamp with time zone NOT NULL,
  containing_journal integer NOT NULL,
  FOREIGN KEY(containing_journal), 
  REFERENCES journals(journal_id),
  [ON DELETE CASCADE]
);`

const createJournalsTable = `CREATE TABLE public.journals (
  journal_id integer NOT NULL,
  title text NOT NULL,
  owner integer NOT NULL,
  FOREIGN KEY(owner), 
  REFERENCES users(user_id),
  [ON DELETE CASCADE]
);`

db.query(createUsersTable, []);
db.query(createJournalsTable, []);
db.query(createEntriesTable, []);
