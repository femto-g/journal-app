export interface IJournal {
  journal_id?: number;
  title: string;
  owner: number;
}
export default function Journal({openJournal, journal} : {openJournal : Function, journal : IJournal}){

  const openJ = (e: any) =>  {

    //change this function?
    openJournal(journal);
    
  }

  return(
    <div className="border-2 border-black">
      <button onClick={openJ} >
        <h2>{journal.title}</h2>
      </button>
    </div>
  )
}