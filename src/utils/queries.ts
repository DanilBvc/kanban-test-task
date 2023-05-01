const fetchRequest = async (url: string, method: string, body?: object) => {
  const request: object = body ? {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),

  } : {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const response = await fetch(url, request);

  if (response.status === 200 || response.status === 201) {
    return response.json();
  }
  return response.status;
};
export default fetchRequest;
