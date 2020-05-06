/* eslint-disable import/no-cycle */
import { deletePost, updatePost, getPost } from '../firebase-controller/firestore-controller.js';

export const eachPost = (objPost) => {
  const eachNote = document.createElement('div');
  eachNote.classList.add('each-post');
  eachNote.innerHTML = `
    <p>${objPost.name}</p>
    <p id="post">${objPost.post}</p>
    <textarea class="hide validity input-post" id="inputPost-${objPost.id}" type="text">${objPost.post}</textarea>
    <div class="container-menu-post" id="containerMenu">
        <label id="menu-${objPost.id}" class="label-menu-post"></label>
        <nav class="nav-post hide" id="nav-${objPost.id}">
        <ul class="menu-post">
            <li class="btn-post-edit" id="edit-${objPost.id}">Editar</li>
            <li class="btn-post-delete" id="delete-${objPost.id}">Eliminar</li>
        </ul>
        </nav>
    </div>
    <button class="hide" id="btnSave">Guardar</button>
    <button class="hide" id="btnCancel">Cancelar</button>
    `;

  const menuPost = eachNote.querySelector(`#menu-${objPost.id}`);
  const navPost = eachNote.querySelector(`#nav-${objPost.id}`);
  menuPost.addEventListener('click', () => {
    navPost.classList.toggle('hide');
  });

  const btnDelete = eachNote.querySelector(`#delete-${objPost.id}`);
  btnDelete.addEventListener('click', () => {
    deletePost(objPost.id);
  });

  const btnEdit = eachNote.querySelector(`#edit-${objPost.id}`);
  const post = eachNote.querySelector('#post');
  const inputPost = eachNote.querySelector(`#inputPost-${objPost.id}`);
  const btnSave = eachNote.querySelector('#btnSave');
  const btnCancel = eachNote.querySelector('#btnCancel');

  btnEdit.addEventListener('click', () => {
    post.classList.add('hide');
    inputPost.classList.remove('hide');
    inputPost.focus();
    navPost.classList.add('hide');
    btnSave.classList.remove('hide');
    btnCancel.classList.remove('hide');
  });

  const editablePost = () => {
    post.contentEditable = 'false';
    post.classList.remove('hide');
    btnSave.classList.add('hide');
    btnCancel.classList.add('hide');
    inputPost.classList.add('hide');
  };

  btnCancel.addEventListener('click', () => {
    inputPost.value = post.textContent;
    getPost(objPost.id).then((doc) => {
      post.textContent = doc.data().post;
    });
    editablePost();
  });

  inputPost.addEventListener('input', () => {
    if (inputPost.validity.valid && inputPost.value) {
      btnSave.disabled = false;
    } else {
      btnSave.disabled = true;
    }
  });

  btnSave.addEventListener('click', () => {
    editablePost();
    updatePost(objPost.id, inputPost.value);
    post.textContent = inputPost.value;
  });

  return eachNote;
};
