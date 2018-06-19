import io from 'socket.io-client';

function createSocket() {
  const socket = io(baseUrl);
  return socket;
}

const baseUrl = 'http://localhost:8080';
function fetchWrapper(apiPath, options) {
  return fetch(`${baseUrl}/api${apiPath}`, options).then(res => res.json());
}

export default {
  getDibs() {
    // TODO: Return fetch for all dibs.
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

  claimDib() {
    // TODO: Add ability to claim a dib.
  },

  subscribeToDibChanges() {
    // TODO: Create subscription connection.
    createSocket();
  },
};
