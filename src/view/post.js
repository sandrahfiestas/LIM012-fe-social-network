/* eslint-disable import/no-cycle */
import { deletePost } from '../firestore-controller.js';

export const eachPost = (objNote) => {
  const eachNote = document.createElement('div');
  eachNote.innerHTML = `
    <div class="each-post">
    <p>${objNote.name}</p>
    <p>${objNote.post}</p>
    <div class="container-menu-post">
        <input type="checkbox" id="menu-post" class="hide">
        <label for="menu-post" class="label-menu-post"></label>
        <nav class="" id="nav-post">
        <ul class="menu-post">
            <li class="btn-post-edit" id="btnPostEdit">Editar</li>
            <li class="btn-post-delete" id="delete-${objNote.id}">Eliminar</li>
        </ul>
        </nav>
    </div>
    </div>`;

  const menuPost = eachNote.querySelector('#menu-post');
  menuPost.addEventListener('click', () => {
    const navPost = eachNote.querySelector('#nav-post');
    if (menuPost.checked === true) {
      navPost.classList.remove('hide');
    } else if (menuPost.checked === false) {
      navPost.classList.add('hide');
    }
  });

  const btnDelete = eachNote.querySelector(`#delete-${objNote.id}`);
  btnDelete.addEventListener('click', () => {
    deletePost(objNote.id);
  });
  return eachNote;
};
