'use client';
import { useState } from "react";
import JournalContainer from "../JournalContainer/JournalContainer";
import EntryContainer from "../EntryContainer/EntryContainer";
import TipTap from "../TipTap/TipTap";
import Entry, { IEntry } from "../Entry/Entry";
import { IJournal } from "../Journal/Journal";

export default function MainApp(){

  //using number as temporary type. 
  const [journal, setJournal] = useState<IJournal | null>(null);
  const [entry, setEntry] = useState<IEntry | null>(null);


  if(journal === null){
    return(
      //takes a user
      <JournalContainer selectJournal={setJournal}/>
    )
  }
  else{
    if(entry === null){
      return(
        //takes a journal
        <EntryContainer selectEntry={setEntry}/>
      )
    }

    return(
      //takes an entry
      <TipTap/>
    )
  }
}