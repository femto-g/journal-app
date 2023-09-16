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
    <div>
      {errorMessage}
      <form action='submit' onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input id="username" type="text" value={username} onChange={onUsernameChange} required maxLength={20}></input>
        <label htmlFor="password">Password</label>
        <input id='password' type='password' value={password} onChange={onPasswordChange} required></input>
        <label htmlFor='password2'>Confirm Password</label>
        <input id='password2' type='password' value={password2} onChange={onPassword2Change} required></input>
        <input type='submit'></input>
      </form>
    </div>
  )
}