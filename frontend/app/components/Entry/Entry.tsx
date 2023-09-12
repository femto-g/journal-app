export interface IEntry {
  entry_id? : number;
  date : string;
  content_html: string;
  containing_journal: number;
}

export default function Entry({openEntry, entry} : {openEntry : Function, entry : IEntry}){

 
  const openE = (e: any) => {
    openEntry(entry);
  }

  return(
    <div className="border-2 border-black" >
    <button onClick={openE}>
      <div>{entry.date}</div>
      {/* <div>{entry.date}</div> */}
      <p>{entry.content_html}</p>
    </button>
    </div>
  )
}