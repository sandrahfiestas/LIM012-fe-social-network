const auth = () => ({
  signInWithEmailAndPassword: (email, password) => new Promise((resolve) => {
    resolve(() => {
      email('hola@gmail.com');
      password('123456');
    });
  }),

  createUserWithEmailAndPassword: (email, password) => new Promise((resolve) => {
    resolve(() => {
      email('hola@laboratoria.com');
      password('123456');
    });
  }),
});

const firebase = {
  auth: auth
};

export default jest.fn(() => firebase);
