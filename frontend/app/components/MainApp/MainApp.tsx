import { useState } from "react";
import JournalContainer from "../JournalContainer/JournalContainer";
import EntryContainer from "../EntryContainer/EntryContainer";
import TipTap from "../TipTap/TipTap";

export default function MainApp(){

  //using number as temporary type. 
  const [journal, setJournal] = useState<Number | null>(null);
  const [entry, setEntry] = useState<Number | null>(null);


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