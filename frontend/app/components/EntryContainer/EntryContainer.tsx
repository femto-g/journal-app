import { useEffect, useState } from "react";
import Entry from "../Entry/Entry";

export default function EntryContainer(){

  const [entries, setEntries] = useState<Array<JSX.Element> | null>([]);
  const [listItems, setListItems] = useState<Array<JSX.Element> | null>([]);

  useEffect(() => {
    const newListItems : Array<JSX.Element> = entries!.map((entry : JSX.Element) => {
      return(
      <li>
        {entry}
      </li>
      )
    });
    setListItems(newListItems);
  },[entries])

  const createNewEntry = () =>{
    setEntries([...entries!, <Entry/>]);
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