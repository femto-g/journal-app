'use client';
import MainApp from "../components/MainApp/MainApp";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import {redirect} from 'next/navigation';
import { fetchGet } from "../util/util";
export const queryclient = new QueryClient();
//this should be protected? so make it Server component
export default async function App() {

  //make request for session here and if request.ok is falsy redirect to login

  // const res : Response = await fetchGet('session') as Response;
  // if(!res.ok){
  //   redirect("../login");
  // }


  return (

    <QueryClientProvider client={queryclient}>
      <MainApp />
      <ReactQueryDevtools initialIsOpen={false}/>
    </QueryClientProvider>

  )
}