import { IEntry } from "../Entry/Entry"
import { Color } from '@tiptap/extension-color'
import ListItem from '@tiptap/extension-list-item'
import TextStyle, { TextStyleOptions } from '@tiptap/extension-text-style'
import { Editor, EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import React from 'react'
import '../Tiptap/styles.css'
import Underline from '@tiptap/extension-underline'
import { MenuBar } from "../TipTap/TipTap"
import { useQuery } from "@tanstack/react-query"
import { fetchGet, fetchPost } from "@/app/util/util"
import {useContext} from 'react';
import { DataContext } from "@/app/contexts/DataContext"

export default function RichTextEditor({entry} : {entry : IEntry}){

  // const contentQuery = useQuery({
  //   queryKey : [entry.entry_id, 'content'],
  //   queryFn: async () => {
  //     fetchPost('entry', )
  //   }
  // })

  const editor = useEditor({
    extensions: [
      Color.configure({ types: [TextStyle.name, ListItem.name] }),
      //this is boilerplate code, used a type assertion here because there was an error
      TextStyle.configure({ types: [ListItem.name] } as Partial<TextStyleOptions>),
      StarterKit.configure({
        bulletList: {
          keepMarks: true,
          keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
        },
        heading: {
          levels: [1,2,3],
        },
      }),
      Underline,
    ],
    content : entry.content_html,
    onUpdate :  async ({editor}) => {
      const html = editor.getHTML();
      const body = {
        entry_id : entry.entry_id,
        content_html : html
       }
      await fetchPost('update-entry', body);
    }
  });

  const dataContext = useContext(DataContext);


  return (
    <div>
      <button onClick={() => dataContext.setEntry(null)}>Back</button>
      <MenuBar editor={editor!} />
      <EditorContent editor={editor} />
    </div>
  )
  
}


