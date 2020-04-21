// Iniciar sesión
export const signIn = (emailLogIn, passwordLogIn) => window.firebase.auth().signInWithEmailAndPassword(emailLogIn, passwordLogIn);


// Registrar usuario
export const signUp = (emailSignUp, passwordSignUp) => window.firebase.auth().createUserWithEmailAndPassword(emailSignUp, passwordSignUp);


// Verificación
export const verification = () => {
  const user = window.firebase.auth().currentUser;
  user.sendEmailVerification().then(() => {
    // Email sent.
    console.log('Enviando correo');
  }).catch((error) => {
    console.log(error);
  });
};

// Cerrar sesión
export const signOut = () => {
  window.firebase.auth().signOut().then(() => {
    console.log('Cerrando sesión');
  }).catch((error) => {
    console.log(error);
  });
};


export const observer = () => {
  window.firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      console.log('usuario loggeado');
    } else {
      console.log('usuario no loggeado');
    }
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