import {
  signIn,
  signUp,
  signOut,
  logInGoogle,
  // logInFacebook,
  verificationEmail,
} from '../src/firebase-controller.js';

// configurando firebase mock
const firebasemock = require('firebase-mock');

const mockauth = new firebasemock.MockAuthentication();
mockauth.autoFlush();

global.firebase = firebasemock.MockFirebaseSdk(
  // use null if your code does not use RTDB
  () => null,
  () => mockauth,
);

const assert = require('assert');

//
describe('signIn', () => {
  it('Debería poder iniciar sesión', () => {
    signIn('hola@gmail.com', '123456').then((user) => {
      expect(user.email).toBe('hola@gmail.com');
      expect(user.isAnonymous).toBe(false);
    });
  });
});

describe('signUp', () => {
  it('Debería poder crear un nuevo usuario', () => {
    signUp('hola@laboratoria.com', '123456').then((user) => {
      expect(user.email).toBe('hola@laboratoria.com');
      expect(user.isAnonymous).toBe(false);
    });
  });
});

describe('signOut', () => {
  it('Debería poder cerrar sesión', () => signOut()
    .then((user) => {
      expect(user).toBe(undefined);
    }));
});

describe('logInGoogle', () => {
  it('Debería poder iniciar sesión con Google', () => logInGoogle()
    .then((user) => {
      expect(user.isAnonymous).toBe(false);
      expect(user.providerData).toEqual([{ providerId: 'google.com' }]);
    }));
});

// describe('logInFacebook', () => {
//   it('Debería poder iniciar sesión con Facebook', () => logInFacebook()
//     .then((user) => {
//       expect(user.isAnonymous).toBe(false);
//       expect(user.providerData).toEqual([{ providerId: 'facebook.com' }]);
//     }));
// });

describe('verificationEmail', () => {
  it('Debería enviar un email luego de registrarse', () => verificationEmail()
    .then((user) => {
      expect(user.emailVerified).toEqual(false);
    }));
});

describe('verificationEmail2', () => {
  it('Debería enviar un email luego de registrarse', (user) => {
    assert.equal(verificationEmail(user.emailVerified), false);
  });
});
