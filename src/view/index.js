/* eslint-disable import/no-cycle */
import NotFound from './404.js';
import Home from './home.js';
import SignIn from './signin.js';
import SignUp from './register.js';
import Profile from './profile.js';

const components = {
  signin: SignIn,
  signup: SignUp,
  home: Home,
  notfound: NotFound,
  profile: Profile,
};

export { components };
