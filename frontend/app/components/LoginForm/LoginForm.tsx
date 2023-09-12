'use client';
import { fetchPost } from "@/app/util/util";
import { SetStateAction, useState } from "react";

export default function LoginForm( /*{loginHandler} : {loginHandler : Function}*/ ){

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");



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
      }
      else{
        setErrorMessage('Incorrect Username or Password.');
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
        <input type='submit'></input>
      </form>
    </div>
  )
}