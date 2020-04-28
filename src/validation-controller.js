// Validación
export const validation = callback => firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    if (user.emailVerified === true) {
      window.location.hash = '#/home';
      return callback(window.location.hash);
    }
  }
  window.location.hash = '#/signin';
  return callback(window.location.hash);
});
