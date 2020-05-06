/* eslint-disable import/no-cycle */
import { deletePost } from '../firebase-controller/firestore-controller.js';

export const eachPost = (objPost) => {
  const eachNote = document.createElement('div');
  eachNote.classList.add('each-post');
  eachNote.innerHTML = `
    <p>${objPost.name}</p>
    <p>${objPost.post}</p>
    <div class="container-menu-post">
        <input type="checkbox" id="menu-${objPost.id}" class="hide">
        <label for="menu-${objPost.id}" class="label-menu-post"></label>
        <nav class="hide" id="nav-${objPost.id}">
        <ul class="menu-post">
            <li class="btn-post-edit" id="btnPostEdit">Editar</li>
            <li class="btn-post-delete" id="delete-${objPost.id}">Eliminar</li>
        </ul>
        </nav>
    </div>`;

  const menuPost = eachNote.querySelector(`#menu-${objPost.id}`);
  menuPost.addEventListener('click', () => {
    const navPost = eachNote.querySelector(`#nav-${objPost.id}`);
    if (menuPost.checked === true) {
      navPost.classList.remove('hide');
    } else if (menuPost.checked === false) {
      navPost.classList.add('hide');
    }
  });

  const btnDelete = eachNote.querySelector(`#delete-${objPost.id}`);
  btnDelete.addEventListener('click', () => {
    deletePost(objPost.id);
  });
  return eachNote;
};
