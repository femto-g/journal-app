import { fetchPost } from "@/app/util/util";

export async function POST(request : Request){
  
  const credentials = await request.json();

  const response = await fetchPost('signup', credentials);

  return response;
};