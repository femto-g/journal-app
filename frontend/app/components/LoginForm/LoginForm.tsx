'use client';
import { fetchPost } from "@/app/util/util";
import { redirect, useRouter } from "next/navigation";
import { SetStateAction, useState } from "react";

export default function LoginForm( /*{loginHandler} : {loginHandler : Function}*/ ){

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();



  const onUsernameChange = (e: { target: { value: SetStateAction<string>; }; }) => {
    setUsername(e.target.value);
  }
  
  const onPasswordChange = (e: { target: { value: SetStateAction<string>; }; }) => {
    setPassword(e.target.value);
  }


  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    //const response = await loginHandler(username, password);
    try {
      const response = await fetchPost('login', {username, password}) as Response;

      if(response.ok){
        //redirect
        //redirect('../../main');
        router.push('../../main');
      }
      else{
        setErrorMessage('Incorrect Username or Password.');
      }
    } catch (error) {
      console.log(error);
    }
  
  }

  return(
    <div className="flex flex-col items-center w-2/5 max-w-[40%] min-w-[20rem] static m-auto md:absolute md:inset-x-[30%]">
      <h1 className="mb-10">Log In</h1>
      {errorMessage}
      <form className="flex flex-col w-[70%] rounded-md bg-purple-100 p-4" action='submit' onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input className="border-2 rounded-md h-8 my-2" id="username" type="text" value={username} onChange={onUsernameChange} required maxLength={20}></input>
        <label htmlFor="password">Password</label>
        <input className="border-2 rounded-md h-8 my-2" id='password' type='password' value={password} onChange={onPasswordChange} required></input>
        <input className="border-2 rounded-md h-8 my-4 bg-purple-400" type='submit' value={"Log in"}></input>
      </form>
    </div>
  )
}