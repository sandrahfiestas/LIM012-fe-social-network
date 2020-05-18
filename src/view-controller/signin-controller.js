/* eslint-disable import/no-cycle */
import {
  signIn, logInGoogle,
} from '../firebase-controller/auth-controller.js';
import { validation } from '../firebase-controller/validation-controller.js';
import { createProfileInfo, getUser } from '../firebase-controller/firestore-controller.js';
import { changeView } from './router.js';

export const signingIn = () => {
  const emailLogIn = document.querySelector('#emailLogIn').value;
  const passwordLogIn = document.querySelector('#passwordLogIn').value;
  const msgAlert = document.querySelector('.balloon');

  signIn(emailLogIn, passwordLogIn).then(() => {
    validation(changeView);
  }).catch(() => {
    msgAlert.classList.remove('ocult');
    setTimeout(() => {
      msgAlert.classList.add('ocult');
    }, 3000);
  });
};

export const signingInGoogle = () => {
  logInGoogle().then((result) => {
    getUser(result.user.uid).then((doc) => {
      if (!doc.exists) {
        createProfileInfo(result.user.uid);
      }
    });
  });
};
