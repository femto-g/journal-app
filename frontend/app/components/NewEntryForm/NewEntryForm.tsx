import { useMutation } from "@tanstack/react-query"
import { IEntry } from "../Entry/Entry";
import { fetchPost } from "@/app/util/util";
import { queryclient } from "@/app/main/page";

export default function NewEntryForm({journalID, display} :{journalID : number, display: boolean}){


  const entryMutation = useMutation({
    mutationFn : async () => {
      const now = new Date().toISOString();
      const entry : IEntry = {
        date: now,
        content_html: " ",
        containing_journal : journalID
      }

      await fetchPost('entry', entry);
    },
    onSuccess : () => {
      queryclient.invalidateQueries([journalID, "entries"]);
    }
  });

  const onSubmit = (e: any) => {
    e.preventDefault();
    entryMutation.mutate();
  }

  const formStyle = {
    display: "none"
  }

  return (
    <div style={display ? formStyle : {}}>
      <form action="submit" onSubmit={onSubmit}>
        {/* <label>Title</label>
        <input type="text"></input> */}
        <input type='submit' value={"Create New Entry"}></input>
      </form>
    </div>
    
  )
}