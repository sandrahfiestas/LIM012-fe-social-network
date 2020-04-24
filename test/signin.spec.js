import { signIn } from '../src/firebase-controller.js';

describe('signIn', () => {
  it('Debería poder iniciar sesión', async () => {
    const user = await signIn('hola@gmail.com', '123456');
    expect(user.email).tobe('hola@gmail.com');
  });
});
