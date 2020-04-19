export default () => {
  const viewRegister = `
    <h3>Registro de usuarios</h3>
    <input type="text" placeholder="Nombre">
    <input type="text" placeholder="Apellido">
    <input id="emailSignUp" type="email" placeholder="ingresa tu email">
    <input id="passwordSignUp" type="password" placeholder="ingresa tu password">
    <button id="btnSignUp">Crear Cuenta</button>
    <h4>o ingresa con</h4>
    <h4>¿Ya tienes cuenta?</h4>
    <h4><a href="#/login">Iniciar Sesión</a></h4>
  `;
  const divElem = document.createElement('div');
  divElem.innerHTML = viewRegister;
  return divElem;
};
