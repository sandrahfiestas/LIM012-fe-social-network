// eslint-disable-next-line import/no-cycle
import Home from './home.js';
// eslint-disable-next-line import/no-cycle
import SignIn from './signin.js';
// eslint-disable-next-line import/no-cycle
import SignUp from './register.js';

const components = {
  signin: SignIn,
  signup: SignUp,
  home: Home,
};

export { components };
