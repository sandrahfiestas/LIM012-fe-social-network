/* eslint-disable import/no-cycle */
import { components } from '../view/index.js';

const changeView = (route) => {
  const sectionContainer = document.getElementById('container');
  sectionContainer.innerHTML = '';
  let routeSelected = '';
  switch (route) {
    case '/':
    case '':
    case '#/':
    {return routeSelected = sectionContainer.appendChild(components.signin());}
    case '#/signin': routeSelected = sectionContainer.appendChild(components.signin());
      break;
    case '#/signup': routeSelected = sectionContainer.appendChild(components.signup());
      break;
    case '#/home': routeSelected = sectionContainer.appendChild(components.home());
      break;
    default: routeSelected = sectionContainer.appendChild(components.notfound());
      break;
  }

  return routeSelected;
};

export { changeView };
