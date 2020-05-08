/* eslint-disable import/no-cycle */
// eslint-disable-next-line import/named
import { deletePost, updatePost, getPost } from '../firebase-controller/firestore-controller.js';
import { user } from '../firebase-controller/auth-controller.js';

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
      <p class="text-post" id="post">${objPost.post}</p>
      <p>Publicado el ${objPost.time.toDate().toLocaleDateString()}</p>
      <textarea class="hide validity input-post" id="inputPost-${objPost.id}" type="text">${objPost.post}</textarea>
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

  // const menuBar = eachNote.querySelector(`#menu-${objPost.id}`);
  // if (userId !== objPost.user) {
  //   menuBar.classList.add('hide');
  // }

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
