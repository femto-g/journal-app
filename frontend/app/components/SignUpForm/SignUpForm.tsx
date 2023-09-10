'use client';
import { SetStateAction, useState } from "react";

export default function SignUpForm( {signupHandler} : {signupHandler : Function} ){

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");


  const onUsernameChange = (e: { target: { value: SetStateAction<string>; }; }) => {
    setUsername(e.target.value);
  }
  
  const onPasswordChange = (e: { target: { value: SetStateAction<string>; }; }) => {
    setPassword(e.target.value);
  }

  const onPassword2Change = (e: { target: { value: SetStateAction<string>; }; }) => {
    setPassword2(e.target.value);
  }

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    const response = await signupHandler(username, password);
  
  }

  return(
    <div>
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