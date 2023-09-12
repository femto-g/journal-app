import { fetchPost } from "@/app/util/util";

export async function POST(request : Request){
  
  const credentials = await request.json();

  const response = await fetchPost('login', credentials);

  return response;
};