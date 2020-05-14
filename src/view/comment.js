import { user } from '../firebase-controller/auth-controller.js';

export const eachComment = (obj) => {
  const comment = document.createElement('div');
  const userId = user().uid;
  comment.innerHTML = `
  <div class="container-photo-comment">
    <img class="picture-comment" src="./img/profile-ico.png" alt="">
    <div class="container-comment">
      <p class="text-comment"><span>${obj.user}</span>${obj.comment}</p>
      <p class="time-comment">${obj.time}</p>
      <label id="menu-${obj.id}" class="${(userId !== obj.userId) ? 'hide' : 'label-menu-comment'}"></label>
      <nav class="nav-comment hide" id="nav-${obj.id}">
          <ul class="menu-comment">
            <li class="btn-comment-edit" id="edit-${obj.id}">Editar</li>
            <li class="btn-comment-delete" id="delete-${obj.id}">Eliminar</li>
          </ul>
      </nav>
    </div>
  </div>
  `;

  const menuComment = comment.querySelector(`#menu-${obj.id}`);
  const navComment = comment.querySelector(`#nav-${obj.id}`);
  menuComment.addEventListener('click', () => {
    navComment.classList.toggle('hide');
  });

  return comment;
};
