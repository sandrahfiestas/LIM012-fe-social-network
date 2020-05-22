/* eslint-disable import/no-cycle */
import { components } from '../view/index.js';
import { getAllPosts } from '../firebase-controller/firestore-controller.js';
import { user } from '../firebase-controller/auth-controller.js';

const changeView = (route) => {
  const currentUser = user();
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
        const arrNotes = [];
        notes.forEach((note) => {
          if (note.privacy === '0' || note.user === currentUser.uid) {
            arrNotes.push(note);
          }
        });
        sectionContainer.innerHTML = '';
        routeSelected = sectionContainer.appendChild(components.home(arrNotes));
      });
      break;
    case '#/profile':
      getAllPosts((notes) => {
        const arrNotes = [];
        notes.forEach((note) => {
          if (note.user === currentUser.uid) {
            arrNotes.push(note);
          }
        });
        sectionContainer.innerHTML = '';
        routeSelected = sectionContainer.appendChild(components.profile(arrNotes));
      });
      break;
    default: routeSelected = sectionContainer.appendChild(components.notfound());
      break;
  }

  return routeSelected;
};

export { changeView };
