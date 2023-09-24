'use client';
import { fetchPost } from "@/app/util/util";
import { redirect, useRouter } from "next/navigation";
import { SetStateAction, useState } from "react";

export default function SignUpForm( /*{signupHandler} : {signupHandler : Function}*/){

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();


  const onUsernameChange = (e: { target: { value: SetStateAction<string>; }; }) => {
    setUsername(e.target.value);
  }
  
  const onPasswordChange = (e: { target: { value: SetStateAction<string>; }; }) => {
    setPassword(e.target.value);
  }

  const onPassword2Change = (e: any) => {
    setPassword2(e.target.value);
    if(password !== e.target.value){
      e.target.setCustomValidity('Passwords do not match.');
    }
    else{
      e.target.setCustomValidity('');
    }
  }

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    //const response = await signupHandler(username, password);
    try {
    const response = await fetchPost('signup', {username, password}) as Response;
    if(response.ok){
      //redirect
      redirect('../../main');
    }
    else{
      setErrorMessage('Log in with this username or sign up with a different username');
    }
    } catch (error) {
      console.log(error);
    }
  
  }

  return(
    <div className="flex flex-col items-center w-2/5 max-w-[40%] min-w-[20rem] static m-auto md:absolute md:inset-x-[30%]">
      <h1 className="mb-10">Sign Up</h1>
      {errorMessage}
      <form className="flex flex-col w-[70%] rounded-md bg-purple-100 p-4" action='submit' onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input className="border-2 rounded-md h-8 my-2" id="username" type="text" value={username} onChange={onUsernameChange} required maxLength={20}></input>
        <label htmlFor="password">Password</label>
        <input className="border-2 rounded-md h-8 my-2" id='password' type='password' value={password} onChange={onPasswordChange} required></input>
        <label htmlFor='password2'>Confirm Password</label>
        <input className="border-2 rounded-md h-8 my-2" id='password2' type='password' value={password2} onChange={onPassword2Change} required></input>
        <input className="border-2 rounded-md h-8 my-4 bg-purple-400" type='submit' value={"Sign Up"}></input>
      </form>
    </div>
  )
}