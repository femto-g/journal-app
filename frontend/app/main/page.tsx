import MainApp from "../components/MainApp/MainApp";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

//this should be protected? so make it Server component
export default function App() {

  //make request for session here and if request.ok is falsy redirect to login


  const queryclient = new QueryClient();
  return (

    <QueryClientProvider client={queryclient}>
      <MainApp />
      <ReactQueryDevtools initialIsOpen={false}/>
    </QueryClientProvider>

  )
}