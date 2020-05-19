/* eslint-disable import/no-cycle */
import { user } from '../firebase-controller/auth-controller.js';
import { updateComment, deleteDoc } from '../firebase-controller/firestore-controller.js';

export const eachComment = (obj) => {
  const newComment = document.createElement('div');
  newComment.classList.add('container-photo-comment');
  const userId = user().uid;
  newComment.innerHTML = `
    <img class="picture-comment" src="./img/profile-ico.png" alt="">
    <div class="container-comment">
      <p class="text-name">${obj.user}</p>
      <p class="text-comment" id="textComment">${obj.comment}</p>
      <textarea class="hide" id="input-comment-${obj.id}">${obj.comment}</textarea>
      <button class="hide" id="btnSaveComment">Guardar</button>
      <button class="hide" id="btnCancelComment">Cancelar</button>
      <p class="time-comment">${obj.time}</p>
      <label id="menu-${obj.id}" class="${(userId !== obj.userId) ? 'hide' : 'label-menu-comment'}"></label>
      <nav class="nav-comment hide" id="nav-${obj.id}">
          <ul class="menu-comment">
            <li class="btn-comment-edit" id="edit-${obj.id}">Editar</li>
            <li class="btn-comment-delete" id="delete-${obj.id}">Eliminar</li>
          </ul>
      </nav>
    </div>
  `;

  const menuComment = newComment.querySelector(`#menu-${obj.id}`);
  const navComment = newComment.querySelector(`#nav-${obj.id}`);
  menuComment.addEventListener('click', () => {
    navComment.classList.toggle('hide');
  });

  const textComment = newComment.querySelector('#textComment');
  const inputComment = newComment.querySelector(`#input-comment-${obj.id}`);
  const btnEditComment = newComment.querySelector(`#edit-${obj.id}`);
  const btnSaveComment = newComment.querySelector('#btnSaveComment');
  const btnCancelComment = newComment.querySelector('#btnCancelComment');
  const btnDelete = newComment.querySelector(`#delete-${obj.id}`);

  btnEditComment.addEventListener('click', () => {
    textComment.classList.add('hide');
    inputComment.classList.remove('hide');
    inputComment.focus();
    navComment.classList.add('hide');
    btnSaveComment.classList.remove('hide');
    btnCancelComment.classList.remove('hide');
  });

  const editComment = () => {
    textComment.classList.remove('hide');
    btnSaveComment.classList.add('hide');
    btnCancelComment.classList.add('hide');
    inputComment.classList.add('hide');
  };

  btnCancelComment.addEventListener('click', () => {
    inputComment.value = textComment.textContent;
    // getComment(obj.id).then((doc) => {
    //   textComment.textContent = doc.data().comment;
    // });
    editComment();
  });

  inputComment.addEventListener('input', () => {
    if (inputComment.validity.valid && inputComment.value) {
      btnSaveComment.disabled = false;
    } else {
      btnSaveComment.disabled = true;
    }
  });

  btnSaveComment.addEventListener('click', () => {
    editComment();
    updateComment(obj.id, inputComment.value);
  });

  btnDelete.addEventListener('click', () => {
    deleteDoc('comments', obj.id);
  });

  return newComment;
};
