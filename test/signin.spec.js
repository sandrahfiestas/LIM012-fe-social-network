import MockFirebase from '../_mocks_/firebase-mock.js';
import { signIn, signUp } from '../src/firebase-controller.js';

global.firebase = MockFirebase();

describe('signIn', () => {
  it('Debería poder iniciar sesión', () => {
    signIn('hola@gmail.com', '123456').then((user) => {
      expect(user.email).tobe('hola@gmail.com');
      expect(user.password).tobe('123456');
    });
  });
});

describe('signUp', () => {
  it('Debería poder crear un nuevo usuario', () => {
    signUp('hola@laboratoria.com', '123456').then((user) => {
      expect(user.email).tobe('hola@laboratoria.com');
      expect(user.password).tobe('123456');
    });
  });
});
