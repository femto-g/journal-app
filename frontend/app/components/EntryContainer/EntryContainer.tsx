import { useContext, useEffect, useState } from "react";
import Entry, { IEntry } from "../Entry/Entry";
import { useQuery } from "@tanstack/react-query";
import { fetchGet, fetchPost } from "@/app/util/util";
import { IJournal } from "../Journal/Journal";
import NewItemSwitcher from "../NewItemSwitcher/NewItemSwitcher";
import NewEntryForm from "../NewEntryForm/NewEntryForm";
import { DataContext } from "@/app/contexts/DataContext";

export default function EntryContainer({selectEntry, journal} : {selectEntry : Function, journal : IJournal}){

  const [entries, setEntries] = useState<Array<IEntry>>([]);
  const [listItems, setListItems] = useState<Array<JSX.Element>>([]);
  const [displayForm, setDisplayForm] = useState<boolean>(false);

  const containing_journal = journal.journal_id;

  // useEffect(() => {
  //   const newListItems : Array<JSX.Element> = entries.map((entry : JSX.Element) => {
  //     return(
  //     <li>
  //       {entry}
  //     </li>
  //     )
  //   });
  //   setListItems(newListItems);
  // },[entries])

  const result = useQuery({
    queryKey : [journal.journal_id,"entries"],
    queryFn : async () => {
      try {
        const res = await fetchPost('entries', {containing_journal}) as Response;
        return res.json(); 
      } catch (error) {
        return error;
      }
    },
    onSuccess(data) {
      setEntries(data);
    },
  });

  // const data : Array<IEntry> = result.data as Array<IEntry>;

  // if(data){
  //   setEntries(data);
  // }

  useEffect(() => {
    const newListItems : Array<JSX.Element> = entries.map((entry) => {
      return(
      <li key={entry.entry_id}>
        <Entry entry={entry} openEntry={selectEntry} />
      </li>
      )
    });
    setListItems(newListItems);
  },[entries]);

  // const createNewEntry = () =>{
  //   setEntries([...entries, <Entry openEntry={selectEntry}/>]);
  // }
 
  const dataContext = useContext(DataContext);
  
  return(
    <div>
      <button onClick={() => dataContext.setJournal(null)}>Back</button>
      <NewEntryForm journalID={journal.journal_id!} display={displayForm} />
      <ul>
        {listItems}
      </ul>
      {/* <button onClick={() => setDisplayForm(!displayForm)}>Add new entry</button> */}
    
      {/* <NewItemSwitcher text="Create new journal" newItemForm={<NewEntryForm journalID={journal.journal_id!}/>} /> */}
    </div>
  )
}