export default function Entry({openEntry} : {openEntry : Function}){

 
  const openE = (e: any) => {
    openEntry(0)
  }

  return(
    <button onClick={openE} className="border-2 border-black" >
      <h2>Name of Entry</h2>
      <h3>Date</h3>
      <p>Some text</p>
    </button>
  )
}