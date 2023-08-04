import { useState } from "react";
import JournalContainer from "../JournalContainer/JournalContainer";
import EntryContainer from "../EntryContainer/EntryContainer";
import TipTap from "../TipTap/TipTap";

export default function MainApp(){

  const [journal, setJournal] = useState();
  const [entry, setEntry] = useState();

  if(journal === null){
    return(
      //takes a user
      <JournalContainer/>
    )
  }
  else{
    if(entry === null){
      return(
        //takes a journal
        <EntryContainer/>
      )
    }

    return(
      //takes an entry
      <TipTap/>
    )
  }
}