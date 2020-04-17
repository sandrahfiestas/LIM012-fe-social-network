import { example } from './example.js';

example();

const botonRegistrar = document.getElementById('boton');


botonRegistrar.addEventListener('click', () => {

  const email = document.getElementById('email').value;
  const contrasena = document.getElementById('contrasena').value;

});
