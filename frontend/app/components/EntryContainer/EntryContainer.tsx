import { useEffect, useState } from "react";
import Entry from "../Entry/Entry";

export default function EntryContainer({selectEntry} : {selectEntry : Function}){

  const [entries, setEntries] = useState<Array<JSX.Element>>([]);
  const [listItems, setListItems] = useState<Array<JSX.Element>>([]);

  useEffect(() => {
    const newListItems : Array<JSX.Element> = entries.map((entry : JSX.Element) => {
      return(
      <li>
        {entry}
      </li>
      )
    });
    setListItems(newListItems);
  },[entries])

  const createNewEntry = () =>{
    setEntries([...entries, <Entry openEntry={selectEntry}/>]);
  }
 
  return(
    <div>
      <ul>
        {listItems}
      </ul>
      <button onClick={createNewEntry}>Add new entry</button>
    </div>
  )
}