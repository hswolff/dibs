const baseUrl = 'http://localhost:8080/api';
function fetchWrapper(apiPath, options) {
  return fetch(`${baseUrl}${apiPath}`, options).then(res => res.json());
}

export default {
  getDibs() {
    return fetchWrapper('/dibs');
  },

  createDib({ creator, title }) {
    return fetchWrapper('/dibs', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        creator,
        title,
      }),
    });
  },

  claimDib({ id, user }) {
    return fetchWrapper(`/dibs/${id}`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        user,
      }),
    });
  },
};
