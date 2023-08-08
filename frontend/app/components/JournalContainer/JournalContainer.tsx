import { useEffect, useState } from "react";
import Journal from "../Journal/Journal";

export default function JournalContainer({selectJournal} : {selectJournal : Function}){

  const [journals, setJournals] = useState<Array<JSX.Element>>([]);
  const [listItems, setListItems] = useState<Array<JSX.Element>>([]);

  useEffect(() => {
    const newListItems : Array<JSX.Element> = journals.map((entry : JSX.Element) => {
      return(
      <li>
        {entry}
      </li>
      )
    });
    setListItems(newListItems);
  },[journals])

  const createNewJournal = () =>{
    setJournals([...journals, <Journal openJournal={selectJournal}/>]);
  }
 
  return(
    <div>
      <ul>
        {listItems}
      </ul>
      <button onClick={createNewJournal}>Create new journal </button>
    </div>
  )
}