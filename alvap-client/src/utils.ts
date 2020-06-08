const fetchFromApi = (path: string, init?: RequestInit) =>
  process.env.NODE_ENV === 'development'
    ? fetch(`http://localhost:3002/api${path}`, init)
    : fetch(`/api${path}`, init);

export const getFromApi = (path: string) =>
  fetchFromApi(path).then((res) => res.json());

export const postToApi = (path: string, data: any) =>
  fetchFromApi(path, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then(async (res) => {
    try {
      return await res.json();
    } catch (error) {
      return {};
    }
  });

export const putToApi = (path: string, data: any) =>
  fetchFromApi(path, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then(async (res) => {
    try {
      return await res.json();
    } catch (error) {
      return {};
    }
  });
