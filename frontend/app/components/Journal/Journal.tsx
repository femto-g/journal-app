export default function Journal({openJournal} : {openJournal : Function}){

  const openJ = (e: any) =>  {

    openJournal(0);
    
  }

  return(
    <div className="border-2 border-black">
      <button onClick={openJ} >
        <h2>Journal Title</h2>
      </button>
    </div>
  )
}