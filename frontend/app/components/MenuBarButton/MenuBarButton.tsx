import { Editor } from "@tiptap/react";

export function MenuBarButton({editor, label} : {editor: Editor, label: string}){



  return(
    <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={
          !editor.can().chain().focus().toggleBold().run()
        }
        className={editor.isActive('bold') ? 'is-active' : ''}
      >


        {label}
      </button>
  )
}