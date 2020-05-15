/* eslint-disable import/no-cycle */
import {
  signUp, verificationEmail, user, logInGoogle, updateUserName,
} from '../firebase-controller/auth-controller.js';
import { createProfileInfo, getUser } from '../firebase-controller/firestore-controller.js';


export const signUpValidInputs = () => {
  const nameUser = document.querySelector('#nameUser');
  const emailLogUp2 = document.querySelector('#emailSignUp');
  const passwordLogUp2 = document.querySelector('#passwordSignUp');
  const btnNewAccount = document.querySelector('#btnNewAccount');

  if (nameUser.value === '' || emailLogUp2.value === '' || passwordLogUp2.value === '') {
    btnNewAccount.classList.add('btn-locked');
    btnNewAccount.disabled = true;
  } else if (nameUser.validity.valid && emailLogUp2.validity.valid
    && passwordLogUp2.validity.valid) {
    btnNewAccount.classList.remove('btn-locked');
    btnNewAccount.disabled = false;
  } else {
    btnNewAccount.classList.add('btn-locked');
    btnNewAccount.disabled = true;
  }
};

export const userRegistration = () => {
  const nameUser = document.querySelector('#nameUser');
  const emailLogUp = document.querySelector('#emailSignUp').value;
  const passwordLogUp = document.querySelector('#passwordSignUp').value;

  signUp(emailLogUp, passwordLogUp).then((result) => {
    createProfileInfo(result.user.uid);
    verificationEmail().then(() => {
      // Guardando nombre de usuario en la base de datos
      const userData = user();
      updateUserName(userData, nameUser.value);

      const notification = document.createElement('div');
      notification.classList.add('notification');
      notification.textContent = 'Revisa tu correo electrónico para terminar el registro';
      document.body.appendChild(notification);
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 3000);
    });
  });
};

export const googleAccount = () => {
  logInGoogle().then((result) => {
    getUser(result.user.uid).then((doc) => {
      if (!doc.exists) {
        createProfileInfo(result.user.uid);
      }
    });
  });
};
