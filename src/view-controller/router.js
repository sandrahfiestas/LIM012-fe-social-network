import { components } from '../view/index.js';

export const changeView = (route) => {
  const container = document.getElementById('container');
  container.innerHTML = '';
  switch (route) {
    case '#/home': { return container.appendChild(components.home()); }
    case '#/register': { return container.appendChild(components.register()); }
    default:
      break;
  }
  console.log(route);
};
