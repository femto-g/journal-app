'use client';
import { useEffect } from "react";
import { fetchGet } from "../util/util"

export default function Page(){

  const onClick = async () => {
    await fetchGet('session');
  }
  
  return(
    <>
      <button onClick={onClick}>Get session</button>
    </>
  )
}