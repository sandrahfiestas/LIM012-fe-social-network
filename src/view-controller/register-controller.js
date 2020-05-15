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
