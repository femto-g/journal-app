'use client';
import { SetStateAction, useState } from "react";

export default function LoginForm( {loginHandler} : {loginHandler : Function} ){

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");



  const onUsernameChange = (e: { target: { value: SetStateAction<string>; }; }) => {
    setUsername(e.target.value);
  }
  
  const onPasswordChange = (e: { target: { value: SetStateAction<string>; }; }) => {
    setPassword(e.target.value);
  }


  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    const response = await loginHandler(username, password);
  
  }

  return(
    <div>
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