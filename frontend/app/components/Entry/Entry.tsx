export default function Entry({openEntry} : {openEntry : Function}){

 
  const openE = (e: any) => {
    openEntry(0)
  }

  return(
    <div className="border-2 border-black" >
    <button onClick={openE}>
      <div>Name of Entry</div>
      <div>Date</div>
      <p>Some text</p>
    </button>
    </div>
  )
}