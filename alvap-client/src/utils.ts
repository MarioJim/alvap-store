const fetchFromApi = (path: string, init?: RequestInit) =>
  process.env.NODE_ENV === 'development'
    ? fetch(`http://localhost:3002/api${path}`, init)
    : fetch(`/api${path}`, init);

export const getFromApi = (path: string) =>
  fetchFromApi(path).then((res) => res.json());

export const postToApi = (path: string, data: any) =>
  fetchFromApi(path, {
    method: 'POST',
    body: JSON.stringify(data),
  }).then((res) => res.json());

export const putToApi = (path: string, data: any) =>
  fetchFromApi(path, {
    method: 'PUT',
    body: JSON.stringify(data),
  }).then((res) => res.json());
