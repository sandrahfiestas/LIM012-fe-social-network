// Iniciar sesión
export const signIn = (emailLogIn, passwordLogIn) => firebase.auth().signInWithEmailAndPassword(emailLogIn, passwordLogIn);


// Registrar usuario
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
  console.log('validacion de usuario');

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      if (user.emailVerified) {
        window.location.hash = '#/home';

        return callback(window.location.hash);
      } else {
        console.log('Error en validación del observador');
      }
    }
    window.location.hash = '#/signin';

  return callback(window.location.hash);
  });
};




// Iniciar sesión con Facebook

export const logInFacebook = () => {
  const provider = new firebase.auth.FacebookAuthProvider();
  return firebase.auth().signInWithPopup(provider);
}


/*
// Inicio de sesión con Facebook
export const provider = new firebase.auth.FacebookAuthProvider();
firebase.auth().signInWithPopup(provider).then(function(result) {
  // This gives you a Facebook Access Token. You can use it to access the Facebook API.
  var token = result.credential.accessToken;
  // The signed-in user info.
  var user = result.user;
  // ...
}).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // The email of the user's account used.
  var email = error.email;
  // The firebase.auth.AuthCredential type that was used.
  var credential = error.credential;
  // ...
});
*/