/* eslint-disable import/no-cycle */
// eslint-disable-next-line import/named
import { deletePost, updatePost, getPost } from '../firebase-controller/firestore-controller.js';
import { user } from '../firebase-controller/auth-controller.js';

const validatePostContent = (img, post, id, time) => {
  let postContent = '';
  if (img) {
    postContent = `
    <img class="post-image" src=${img}>
    <p class="text-post" id="post">${post}</p>
    <p>Publicado el ${time}</p>
    <textarea class="hide validity input-post" id="inputPost-${id}" type="text">${post}</textarea>
    `;
  } else {
    postContent = `
    <p id="post">${post}</p>
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
      <img class="like-picture" src="./img/profile-ico.png" alt="">
      <div class="like-counter">
        <div class="heart"></div>
        <p>22</p>
        <p>likes</p>
      </div>
    </div>
    <div class="each-post left">
      <p>${objPost.name}</p>
      ${validatePostContent(objPost.img, objPost.post, objPost.id, objPost.time)}
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

  // const selectOption = eachNote.querySelector('.privacy');
  // selectOption.addEventListener('change', () => {
  //   if (selectOption.value === 'public') {
  //     console.log('es público');
  //   } else {
  //     console.log('es privado');
  //   }
  // });

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
