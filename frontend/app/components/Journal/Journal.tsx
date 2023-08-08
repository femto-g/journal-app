export default function Journal({openJournal} : {openJournal : Function}){

  const openJ = (e: any) =>  {

    openJournal(0);
    
  }

  return(
    <div>
      <button onClick={openJ} className="border-2 border-black">
        <h2>Journal Title</h2>
      </button>
    </div>
  )
}