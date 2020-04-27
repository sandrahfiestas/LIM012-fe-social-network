// Iniciar sesión
export const signIn = (emailLogIn, passwordLogIn) => firebase.auth().signInWithEmailAndPassword(emailLogIn, passwordLogIn);

// Registrar usuario
export const signUp = (emailSignUp, passwordSignUp) => firebase.auth().createUserWithEmailAndPassword(emailSignUp, passwordSignUp);


// Verificación
export const verificationEmail = () => firebase.auth().currentUser.sendEmailVerification();

// Cerrar sesión
export const signOut = () => firebase.auth().signOut();

// Validación
export const validation = (callback) => {
  // console.log('validacion de usuario');
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      if (user.emailVerified === true) {
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
