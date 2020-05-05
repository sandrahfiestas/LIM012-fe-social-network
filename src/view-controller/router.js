/* eslint-disable import/no-cycle */
import { components } from '../view/index.js';
import { getAllPosts } from '../firebase-controller/firestore-controller.js';

const changeView = (route) => {
  window.location.hash = route;
  const sectionContainer = document.getElementById('container');
  sectionContainer.innerHTML = '';
  let routeSelected = '';
  switch (route) {
    case '#/signin': routeSelected = sectionContainer.appendChild(components.signin());
      break;
    case '#/signup': routeSelected = sectionContainer.appendChild(components.signup());
      break;
    case '#/home':
      getAllPosts((notes) => {
        sectionContainer.innerHTML = '';
        routeSelected = sectionContainer.appendChild(components.home(notes));
      });
      break;
    case '#/profile': routeSelected = sectionContainer.appendChild(components.profile());
      break;
    default: routeSelected = sectionContainer.appendChild(components.notfound());
      break;
  }

  return routeSelected;
};

export { changeView };
