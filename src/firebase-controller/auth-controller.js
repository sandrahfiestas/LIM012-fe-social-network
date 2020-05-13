/* eslint-disable max-len */
// Iniciar sesión
export const signIn = (emailLogIn, passwordLogIn) => firebase.auth().signInWithEmailAndPassword(emailLogIn, passwordLogIn);

// Registrar usuario
export const signUp = (emailSignUp, passwordSignUp) => firebase.auth().createUserWithEmailAndPassword(emailSignUp, passwordSignUp);

// Verificación de email
export const verificationEmail = () => firebase.auth().currentUser.sendEmailVerification();

// Cerrar sesión
export const signOut = () => firebase.auth().signOut();

// Iniciar sesión con Google
export const logInGoogle = () => {
  // Creando instancia del proveedor - Google
  const providerGoogle = new firebase.auth.GoogleAuthProvider();
  return firebase.auth().signInWithPopup(providerGoogle);
};

// Usuario loggeado
export const user = () => firebase.auth().currentUser;


// Guardando/actualizando nombre de usuario
export const updateUserName = (userData, userName) => {
  userData.updateProfile({
    displayName: userName,
  });
};


// // Guardando/actualizando nombre de usuario
export const updatePhotoAuth = (userData, photoProfile) => {
  userData.updateProfile({
    photoURL: photoProfile,
  });
};


// Iniciar sesión con Facebook
// export const logInFacebook = () => {
//   const providerFacebook = new firebase.auth.FacebookAuthProvider();
//   return firebase.auth().signInWithPopup(providerFacebook);
// };
