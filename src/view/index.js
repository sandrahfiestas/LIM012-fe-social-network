import NotFound from './404.js';
import Home from './home.js';
import SignIn from './signin.js';
import SignUp from './register.js';

const components = {
    signin: SignIn,
    signup: SignUp,
    home: Home,
    notfound: NotFound,
};

export { components };
