// Validación
export const validation = callback => firebase.auth().onAuthStateChanged((user) => {
  let route = '#/signin';
  if (user) {
    if (user.emailVerified) {
      route = '#/home';
    }
  }
  return callback(route);
});
