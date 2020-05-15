/* eslint-disable import/no-cycle */
import { user } from '../firebase-controller/auth-controller.js';
import { getComment, updateComment, deleteComment } from '../firebase-controller/firestore-controller.js';

export const eachComment = (obj) => {
  const comment = document.createElement('div');
  comment.classList.add('container-photo-comment');
  const userId = user().uid;
  comment.innerHTML = `
    <img class="picture-comment" src="./img/profile-ico.png" alt="">
    <div class="container-comment">
      <p class="text-comment" id="textComment"><span>${obj.user}</span>${obj.comment}</p>
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

  const menuComment = comment.querySelector(`#menu-${obj.id}`);
  const navComment = comment.querySelector(`#nav-${obj.id}`);
  menuComment.addEventListener('click', () => {
    navComment.classList.toggle('hide');
  });

  const textComment = comment.querySelector('#textComment');
  const inputComment = comment.querySelector(`#input-comment-${obj.id}`);
  const btnEdit = comment.querySelector(`#edit-${obj.id}`);
  const btnSave = comment.querySelector('#btnSaveComment');
  const btnCancel = comment.querySelector('#btnCancelComment');
  const btnDelete = comment.querySelector(`#delete-${obj.id}`);

  btnEdit.addEventListener('click', () => {
    textComment.classList.add('hide');
    inputComment.classList.remove('hide');
    inputComment.focus();
    navComment.classList.add('hide');
    btnSave.classList.remove('hide');
    btnCancel.classList.remove('hide');
  });

  const editComment = () => {
    textComment.contentEditable = 'false';
    textComment.classList.remove('hide');
    btnSave.classList.add('hide');
    btnCancel.classList.add('hide');
    inputComment.classList.add('hide');
  };

  btnCancel.addEventListener('click', () => {
    inputComment.value = textComment.textContent;
    getComment(obj.id).then(() => {
      comment.textContent = obj.comment;
    });
    editComment();
  });

  inputComment.addEventListener('input', () => {
    if (inputComment.validity.valid && inputComment.value) {
      btnSave.disabled = false;
    } else {
      btnSave.disabled = true;
    }
  });

  btnSave.addEventListener('click', () => {
    editComment();
    updateComment(obj.id, inputComment.value);
    comment.textContent = inputComment.value;
  });

  btnDelete.addEventListener('click', () => {
    deleteComment(obj.id);
  });

  return comment;
};
