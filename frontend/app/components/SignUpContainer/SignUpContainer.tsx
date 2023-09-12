import { fetchPost } from "../../util/util";
import SignUpForm from "../SignUpForm/SignUpForm";
export default function SignUpContainer(){

  const signup = async (username : string, password : string) => {
    'use server';
    const response = await fetchPost('signup', {username, password});
  }


  return(
    <div>
      {/* <SignUpForm signupHandler={signup} /> */}
      <SignUpForm />
    </div>
  )
} 