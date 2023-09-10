
export async function fetchGet(endpoint : string){

  const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/${endpoint}`, {
    method: 'GET',
    mode: 'cors',
    credentials: 'include',
  });

  return response;

}

export async function fetchPost(endpoint : string, body : Object){

  const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/${endpoint}`, {
    method: 'POST',
    mode: 'cors',
    credentials: 'include',
    body: JSON.stringify(body),
    headers: {"content-type" : "application/json"}
  });

  return response;

}