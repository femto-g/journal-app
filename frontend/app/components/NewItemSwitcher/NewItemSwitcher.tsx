import { useState } from "react";
import NewEntryForm from "../NewEntryForm/NewEntryForm";
import { JsxElement } from "typescript";
import NewJournalForm from "../NewJournalForm/NewJournalForm";

export default function NewItemSwitcher({text, newItemForm} : {text : String, newItemForm : JSX.Element}){

  const [switched, setSwitched] = useState<Boolean>(false);

  if(switched){
    if(typeof newItemForm === typeof NewJournalForm){
      
    }

    return <NewJournalForm />;

    // else{
    //   return <NewEntryForm />
    // }
  }

  const handleClick = () =>{
    setSwitched(true);
  }

  return(
    <button onClick={handleClick}>{text}</button>
  )

}