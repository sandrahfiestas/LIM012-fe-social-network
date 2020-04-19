export default () => {
  const viewHome = `
    <div id="contenido"></div>
    <h2>Perfil</h2>
    <button id="btnSC"><a href="#/">Cerrar Sesión</a></button>
  `;
  const divElem = document.createElement('div');
  divElem.innerHTML = viewHome;
  return divElem;
};
