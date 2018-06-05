const baseUrl = 'http://localhost:8080';
function fetchWrapper(apiPath, options) {
  return fetch(`${baseUrl}/api${apiPath}`, options).then(res => res.json());
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
};
