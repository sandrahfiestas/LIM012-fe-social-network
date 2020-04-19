export const signIn = (emailLogIn, passwordLogIn) => {
  window.firebase.auth().signInWithEmailAndPassword(emailLogIn, passwordLogIn).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode);
    console.log(errorMessage);
    // ...
  });
};

export const signUp = (emailSignUp, passwordSignUp) => {
  window.firebase.auth().createUserWithEmailAndPassword(emailSignUp, passwordSignUp).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode);
    console.log(errorMessage);
  });
};

export const verification = () => {
  const user = window.firebase.auth().currentUser;
  user.sendEmailVerification().then(() => {
    // Email sent.
    console.log('Enviando correo');
  }).catch((error) => {
    console.log(error);
  });
};

export const logOut = () => {
  window.firebase.auth().signOut().then(() => {
    console.log('Cerrando sesión');
  }).catch((error) => {
    console.log(error);
  });
};


export const observer = () => {
  let result = '';
  window.firebase.auth().onAuthStateChanged((user) => {
    console.log(user);
    if (user) {
      result = 'ok';
    } else {
      result = 'no';
    }
  });
  console.log(result);

  return result;
};
