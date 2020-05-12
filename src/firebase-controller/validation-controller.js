// Validación
export const validation = callback => firebase.auth().onAuthStateChanged((user) => {
  let route = '#/signin';
  if (window.location.hash === '#/signup') route = '#/signup';

  if (user) {
    if (user.emailVerified) {
      switch (window.location.hash) {
        case '#/profile': route = '#/profile';
          break;
        default: route = '#/home';
          break;
      }
    }
  }
  return callback(route);
});
