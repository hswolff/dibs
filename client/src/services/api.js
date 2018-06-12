import io from 'socket.io-client';

function createSocket() {
  const socket = io(baseUrl);
  return socket;
}

const baseUrl = __API_URL__ || 'http://localhost:8080';
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

  subscribeToDibChanges(cb) {
    createSocket().on('dib changeEvent', cb);
  },
};
