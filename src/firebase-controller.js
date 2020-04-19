export const signIn = (emailLogIn, passwordLogIn) => {
  window.firebase.auth().signInWithEmailAndPassword(emailLogIn, passwordLogIn).then(() => {
    console.log('inicie sesion');
  }).catch((error) => {
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
  window.firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      if (user.emailVerified) {

        /*
         * Lo que muestra cuando ya hay un usuario Loggeado
         * sectionContainer.innerHTML = `
         * <p>Bienvenido</p>
         * <button id="btnSignOut">Cerrar sesión</button>
         * `;
         * const btnSignOut = document.getElementById('btnSignOut');
         * btnSignOut.addEventListener('click', () => {
         *   // Llamar aquí la función que cierra sesión
         * });
         */
      } else {
        // sectionContainer.innerHTML = 'Revise su correo electrónico';
      }

    console.log('Hay un user loggeado');

    } else {
      // Si No hay un usuario loggeado debería mostrar la vista de inicio de sesión
      console.log('No hay usuario loggeado');
    }
  });
};
