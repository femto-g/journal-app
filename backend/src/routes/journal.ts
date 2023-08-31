import Router from 'express-promise-router';
export const router = Router();
import {createJournal, readJournals, Journal} from '../db/access/journal';
import '../util/types/index';

router.get('/journals', async (req, res, next) => {

  if(!req.user){
    return next(new Error('Not authenticated'));
  }

  const owner = req.user.user_id;

  try {
    const result = await readJournals(owner)
    const journals : Array<Journal> = result.rows;
    return res.json(journals);
  } catch (error) {
    return next(error);
  }
});

router.post('/journal', async (req, res, next) => {
  if(!req.user){
    return next(new Error('Not authenticated'));
  }
  if(!req.body || !req.body.title){
    return next(new Error('No title in body'));
  }

  const journal : Journal = {owner: req.user.user_id, title: req.body.title}

  try {
    await createJournal(journal);
    return res.sendStatus(200); 
  } catch (error) {
    return next(error);
  }
});

