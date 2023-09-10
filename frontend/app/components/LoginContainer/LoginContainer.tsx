import { fetchPost } from "../../util/util";
import LoginForm from "../LoginForm/LoginForm";
export default function LoginContainer(){

  const login = async (username : string, password : string) => {
    'use server';
    const response = await fetchPost('login', {username, password});
  }


  return(
    <div>
      <LoginForm loginHandler={login}/>
    </div>
  )
} 