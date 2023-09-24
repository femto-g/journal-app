'use client';
import { useState, useContext } from "react";
import JournalContainer from "../JournalContainer/JournalContainer";
import EntryContainer from "../EntryContainer/EntryContainer";
import TipTap from "../TipTap/TipTap";
import Entry, { IEntry } from "../Entry/Entry";
import { IJournal } from "../Journal/Journal";
import RichTextEditor from "../RichTextEditor/RichTextEditor";
import { useQuery } from "@tanstack/react-query";
import { fetchGet } from "@/app/util/util";
import { redirect, useRouter } from "next/navigation";
import { DataContext } from "@/app/contexts/DataContext";

export default function MainApp(){

  //using number as temporary type. 
  const [journal, setJournal] = useState<IJournal | null>(null);
  const [entry, setEntry] = useState<IEntry | null>(null);

  const router = useRouter();

  const dataContextObject = {
    journal,
    setJournal,
    entry,
    setEntry
  };

  const sessionQuery = useQuery({
    queryKey: ["session"],
    queryFn: async () => {
      try {
        const res = await fetchGet('session') as Response;
        return res.ok;
      } catch (error) {
        console.log(error);
      }
    },
    onSuccess(status : boolean) {
      if(!status){
        router.push('/login');
      }
    }
  });



  if(sessionQuery.isLoading){
    return(
      <div>Loading</div>
    )
  }

  if(journal === null){
    return(
      //takes a user
      <DataContext.Provider value={dataContextObject}>
        <JournalContainer selectJournal={setJournal}/>
      </DataContext.Provider>
      
    )
  }
  else{
    if(entry === null){
      return(
        //takes a journal
        <DataContext.Provider value={dataContextObject}>
          <EntryContainer selectEntry={setEntry} journal={journal}/>
        </DataContext.Provider>
      )
    }

    return(
      //takes an entry
      // <TipTap/>
      <DataContext.Provider value={dataContextObject}>
        <RichTextEditor entry={entry} />
      </DataContext.Provider>
    )
  }
}