'use client';
import { queryclient } from "@/app/main/page";
import { fetchPost } from "@/app/util/util";
import { QueryClient, useMutation } from "@tanstack/react-query";
import { FormEvent, useState } from "react";

export default function NewJournalForm({display} : {display : boolean}) {

  const [title, setTitle] = useState<String | null>("");

  const journalMutation = useMutation({
    mutationFn : async (title : String) => {
      await fetchPost('journal', {title});
    },
    onSuccess : () => {
      queryclient.invalidateQueries(['journals']);
    }
  });

  const onSubmit = (e : any) => {
    e.preventDefault();
    journalMutation.mutate(title!);
  }

  const onTitleChange = (e : any)  => {
    setTitle(e.target.value);
  }

  const formStyle = {
    display: "none"
  }

  return (
    <div style={display ? formStyle : {}}>
      <form action='submit' onSubmit={onSubmit}>
        <label htmlFor="title">Title</label>
        <input type='text' id="title" onChange={onTitleChange} required></input>
        <button type='submit'>submit</button>
      </form>
    </div>
  )
}