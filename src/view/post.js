/* eslint-disable import/no-cycle */
// eslint-disable-next-line import/named
import {
  deletePost, updatePost, getPost, updatePrivacy,
} from '../firebase-controller/firestore-controller.js';
import { user } from '../firebase-controller/auth-controller.js';

const validatePostContent = (img, post, id) => {
  let postContent = '';
  if (img) {
    postContent = `
    <p class="text-post" id="post">${post}</p>
    <textarea class="hide validity input-post" id="inputPost-${id}" type="text">${post}</textarea>
    <img class="post-upload-image" src=${img}>
    `;
  } else {
    postContent = `
    <p class="text-post" id="post">${post}</p>
    <textarea class="hide validity input-post" id="inputPost-${id}" type="text">${post}</textarea>
    `;
  }
  return postContent;
};

export const eachPost = (objPost) => {
  const eachNote = document.createElement('div');
  eachNote.classList.add('container-post');
  const userId = user().uid;
  eachNote.innerHTML = `
    <div class="like-post">
      <div>
        <img class="like-picture" src="./img/profile-ico.png" alt="">
        <p class="post-time">${objPost.time}</p>
      </div>
      <div class="like-counter">
        <div class="like heart"></div>
        <p class="counter-text">0</p>
        <p class="counter-text">likes</p>
      </div>
    </div>
    <div class="each-post left">
      <div class="container-name-privacity">
        <p>${objPost.name}</p>
        <select class="privacy ${(userId === objPost.user) || 'hide'} text-2">
          <option value="0" ${(objPost.privacy === '1') || 'selected'}>&#xf0ac</option>
          <option value="1" ${(objPost.privacy === '0') || 'selected'}>&#xf023</option>
        </select>
      </div>
      ${validatePostContent(objPost.img, objPost.post, objPost.id)}
      <div class="container-menu-post" id="containerMenu">
        <label id="menu-${objPost.id}" class="${(userId !== objPost.user) ? 'hide' : 'label-menu-post'}"></label>
        <nav class="nav-post hide" id="nav-${objPost.id}">
          <ul class="menu-post">
            <li class="btn-post-edit" id="edit-${objPost.id}">Editar</li>
            <li class="btn-post-delete" id="delete-${objPost.id}">Eliminar</li>
          </ul>
        </nav>
      </div>
      <button class="hide" id="btnSave">Guardar</button>
      <button class="hide" id="btnCancel">Cancelar</button>
    </div>
  `;

  // ${(objPost.likes.indexOf(userId) === -1) ? 'heart' : 'heart-2'}
  const likes = eachNote.querySelector('.like');
  likes.addEventListener('click', () => {
    console.log(objPost.likes);
    const result = objPost.likes.indexOf(userId);
    console.log(objPost.likes.indexOf(userId) === -1);
    if (result === -1) {
      likes.classList.add('heart-2');
      objPost.likes.push(userId);
      console.log('No hay like');
    } else {
      likes.classList.remove('heart-2');
      console.log('Sí hay like');
    }
  });

  const selectOption = eachNote.querySelector('.privacy');
  selectOption.addEventListener('change', () => {
    updatePrivacy(objPost.id, selectOption.value);
  });

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
