import { fetchGet } from "@/app/util/util";


export default function HeadingBar(){

  return(
    <div>
      <nav>Title</nav>
      <button onClick={async () => fetchGet('logout')}>Logout</button>
    </div>
  )
}