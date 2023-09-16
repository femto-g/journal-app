import { useEffect, useState } from "react";
import Journal, { IJournal } from "../Journal/Journal";
import NewItemSwitcher from "../NewItemSwitcher/NewItemSwitcher";
import NewJournalForm from "../NewJournalForm/NewJournalForm";
import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchGet, fetchPost } from "@/app/util/util";

export default function JournalContainer({selectJournal} : {selectJournal : Function}){

  const [journals, setJournals] = useState<Array<IJournal>>([]);
  const [listItems, setListItems] = useState<Array<JSX.Element>>([]);
  const [displayForm, setDisplayForm] = useState<boolean>(false);

  const result = useQuery({
    queryKey : ["journals"],
    queryFn : async () => {
      try {
        const res = await fetchGet('journals') as Response;
        return res.json(); 
      } catch (error) {
        return error;
      }
    },
    onSuccess(data) {
      setJournals(data);
    },
  });

  // const data : Array<IJournal> = result.data as Array<IJournal>;

  // if(data){
  //   setJournals(data);
  // }

  useEffect(() => {
    const newListItems : Array<JSX.Element> = journals.map((journal) => {
      return(
      <li>
        <Journal journal={journal} openJournal={selectJournal} />
      </li>
      )
    });
    setListItems(newListItems);
  },[journals]);

  // const createNewJournal = () =>{
  //   setJournals([...journals, <Journal openJournal={selectJournal}/>]);
  // }

  // const journalMutation = useMutation({
  //   mutationFn : async (title) => {
  //     return fetchPost('journal', {title});
  //   }
  // });
 
  return(
    <div className="container mx-auto">
      <ul>
        {listItems}
      </ul>
      <button onClick={() => setDisplayForm(!displayForm)}>Start new Journal</button>
      <NewJournalForm display={displayForm} />
      {/* <NewItemSwitcher text="Create new journal" newItemForm={<NewJournalForm />} /> */}
    </div>
  )
}