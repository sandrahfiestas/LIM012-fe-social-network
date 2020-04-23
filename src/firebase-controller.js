/* eslint-disable multiline-comment-style */
// Iniciar sesión
export const signIn = (emailLogIn, passwordLogIn) => window.firebase.auth().signInWithEmailAndPassword(emailLogIn, passwordLogIn);


// Registrar usuario
export const signUp = (emailSignUp, passwordSignUp) => window.firebase.auth().createUserWithEmailAndPassword(emailSignUp, passwordSignUp);


// Verificación
export const verification = () => {
  const user = window.firebase.auth().currentUser;

  return user.sendEmailVerification();
};

// Validación
export const validation = (callback) => {
  console.log('validation');
  const user = window.firebase.auth().currentUser;
  if (user.emailVerified) {
    return callback('/#home');
  }

  return callback('#/signin');
};

// Cerrar sesión
export const signOut = () => {
  window.firebase.auth().signOut().then(() => {
    console.log('Cerrando sesión');
  }).catch((error) => {
    console.log(error);
  });
};

export const observer = (callback) => {
  console.log('observer');

  window.firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      if (user.emailVerified) {
        window.location.hash = '#/home';

        return callback('#/home');
      }
    }
    window.location.hash = '#/signin';

  return callback('#/signin');
  });
};
