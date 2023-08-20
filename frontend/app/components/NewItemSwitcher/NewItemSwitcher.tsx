import { useState } from "react";
import NewEntryForm from "../NewEntryForm/NewEntryForm";
import { JsxElement } from "typescript";

export default function NewItemSwitcher({text, newItemForm} : {text : String, newItemForm : JSX.Element}){

  const [switched, setSwitched] = useState<Boolean>(false);

  if(switched){
    return(
      newItemForm
    )
  }

  const handleClick = () =>{
    setSwitched(true);
  }

  return(
    <button onClick={handleClick}>{text}</button>
  )

}