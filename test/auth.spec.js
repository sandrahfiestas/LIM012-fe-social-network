import {
  signIn,
  signUp,
  signOut,
  logInGoogle,
  verificationEmail,
  user,
} from '../src/firebase-controller/auth-controller.js';

// configurando firebase mock
const firebasemock = require('firebase-mock');

const mockauth = new firebasemock.MockAuthentication();

mockauth.autoFlush();

global.firebase = firebasemock.MockFirebaseSdk(
  // use null if your code does not use RTDB
  () => null,
  () => mockauth,

);

describe('signIn', () => {
  it('Debería poder iniciar sesión', (done) => {
    signIn('hola@gmail.com', '123456').then((userLog) => {
      expect(userLog.email).toBe('hola@gmail.com');
      expect(userLog.isAnonymous).toBe(false);
      done();
    });
  });
});

describe('signUp', () => {
  it('Debería poder crear un nuevo usuario', (done) => {
    signUp('hola@laboratoria.com', '123456').then((newUser) => {
      expect(newUser.email).toBe('hola@laboratoria.com');
      expect(newUser.isAnonymous).toBe(false);
      done();
    });
  });
});

describe('signOut', () => {
  it('Debería poder cerrar sesión', () => signOut()
    .then((userLog) => {
      expect(userLog).toBe(undefined);
    }));
});

describe('logInGoogle', () => {
  it('Debería poder iniciar sesión con Google', () => logInGoogle()
    .then((userLog) => {
      expect(userLog.isAnonymous).toBe(false);
      expect(userLog.providerData).toEqual([{ providerId: 'google.com' }]);
    }));
});

describe('verificationEmail', () => {
  it('Debería enviar un mail de verificación', () => {
    const myMock = jest.fn();
    firebase.auth().currentUser.sendEmailVerification = myMock;
    verificationEmail();
    expect(myMock.mock.calls).toHaveLength(1);
  });
});

describe('Current user', () => {
  it('Recognize current user', () => {
    signIn('hola@laboratoria.com', '123456')
      .then(() => {
        expect(user().email).toBe('hola@laboratoria.com');
      });
  });
});
