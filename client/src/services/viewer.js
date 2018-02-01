const key = 'dibs:viewer';

const viewer = {
  signIn(username) {
    localStorage.setItem(key, username);
  },

  signOut(username) {
    localStorage.removeItem(key);
  },

  getUsername() {
    return localStorage.getItem(key);
  },

  isSignedIn() {
    return this.getUsername() != null;
  },
};

export default viewer;
