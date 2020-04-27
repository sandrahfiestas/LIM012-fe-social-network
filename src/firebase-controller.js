// Iniciar sesión
// eslint-disable-next-line max-len
export const signIn = (emailLogIn, passwordLogIn) => firebase.auth().signInWithEmailAndPassword(emailLogIn, passwordLogIn);


// Registrar usuario
// eslint-disable-next-line max-len
export const signUp = (emailSignUp, passwordSignUp) => firebase.auth().createUserWithEmailAndPassword(emailSignUp, passwordSignUp);


// Verificación
export const verification = () => {
  const user = firebase.auth().currentUser;

  return user.sendEmailVerification();
};

/*
// Validación
export const validation = (callback) => {
  console.log('validation');
  const user = firebase.auth().currentUser;
  if (user.emailVerified) {
    window.location.hash = '#/home';

    return callback('/#home');
  }

  return callback('#/signin');
};
*/

// Cerrar sesión
export const signOut = () => {
  firebase.auth().signOut().then(() => {
    console.log('Cerrando sesión');
  }).catch((error) => {
    console.log(error);
  });
};

export const validation = (callback) => {
  // console.log('validacion de usuario');
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      if (user.emailVerified === true) {
        window.location.hash = '#/home';
        return callback(window.location.hash);
      }
      window.location.hash = '#/signin';
    }
    return callback(window.location.hash);
  });
};


// Iniciar sesión con Google
export const logInGoogle = () => {
  // Creando instancia del proveedor - Google
  const providerGoogle = new firebase.auth.GoogleAuthProvider();
  return firebase.auth().signInWithPopup(providerGoogle);
}


// Iniciar sesión con Facebook
export const logInFacebook = () => {
  const providerFacebook = new firebase.auth.FacebookAuthProvider();
  return firebase.auth().signInWithPopup(providerFacebook);
}

