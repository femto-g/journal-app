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

  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const monthNames =  ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const date : Date = new Date(entry.date);
  const entryText = `${dayNames[date.getDay()]}, ${date.getDate()} ${monthNames[date.getMonth()]} ${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;

  return(
    <div className="border-[1px] border-black rounded-md text-center my-10">
      <button className="w-full" onClick={openE}>
        <div className="bg-purple-300 ">{entryText}</div>
        {/* <div>{entry.date}</div> */}
        {/* <p>{entry.content_html}</p> */}
        {/*TODO: MUST SANITIZE THIS CONTENT*/}
        <div className="opacity-50"dangerouslySetInnerHTML={ {__html : entry.content_html}}></div>
      </button>
    </div>
  )
}