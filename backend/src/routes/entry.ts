import Router from 'express-promise-router';
export const router = Router();
import {createEntry, readEntries, Entry, updateEntry} from '../db/access/entry';
import '../util/types/index';

router.get('/entries', async (req, res, next) => {

  if(!req.user){
    return next(new Error('Not authenticated'));
  }

  const containing_journal = req.body.journal_id;

  try {
    const result = await readEntries(containing_journal);
    const entries : Array<Entry> = result.rows;
    return res.json(entries);
  } catch (error) {
    return next(error);
  }
});

router.post('/entry', async (req, res, next) => {
  if(!req.user){
    return next(new Error('Not authenticated'));
  }
  if(!req.body || !req.body.date || !req.body.content_html || !req.body.containing_journal){
    return next(new Error('No body or shape of entry is wrong'));
  }

  const entry: Entry = {
    date: req.body.date,
    content_html : req.body.content_html,
    containing_journal : req.body.containing_journal
  }

  try {
    await createEntry(entry);
    return res.sendStatus(200); 
  } catch (error) {
    return next(error);
  }
});

router.post('/update-entry', async (req, res, next) => {

  if(!req.user){
    return next(new Error('Not authenticated'));
  }
  if(!req.body || !req.body.entry_id || !req.body.content_html){
    return next(new Error('No body or shape of body is wrong'));
  }

  try {
    await updateEntry(req.body.entry_id, req.body.content_html);
    return res.sendStatus(200);
  } catch (error) {
    return next(error);
  }
});

