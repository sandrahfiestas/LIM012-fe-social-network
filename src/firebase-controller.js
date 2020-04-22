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
