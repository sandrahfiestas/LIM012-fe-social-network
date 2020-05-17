/* eslint-disable import/no-cycle */
import { changeView } from '../view-controller/router.js';
// import { profileInfo } from '../firestore-controller.js';
import { signOut, user, updateUserName } from '../firebase-controller/auth-controller.js';
import { getProfileInfo, updateProfileInfo } from '../firebase-controller/firestore-controller.js';
import { eachPost } from './post.js';
import { uploadPhotoProfile, downLoadPhoto } from '../firebase-controller/storage-controller.js';

export default (notes) => {
  const currentUser = user();

  const viewUserProfile = document.createElement('div');
  viewUserProfile.innerHTML = `
    <header class="header-home">
      <label id="menu-mobile2" class="menu-mobile"></label>
      <nav class="nav-home hide">
        <ul class="menu-home">
          <li class="btn-go-profile" id="btnGoHome"><img class="ico-home" src="./img/home-ico.png">Inicio</li>
          <li class="btn-go-out" id="btnSignOut2"><img class="ico-sign-out" src="./img/sign-out.png">Cerrar sesión</li>
        </ul>
      </nav>
      <img src="./img/logo-voz-amiga.png" alt="Voz Amiga">
    </header>
    <section class="container-home">
      <div class="profile-section">
        <div class="cover-image"></div>
        <div class="profile">
          <div class="profile-photo-name">
            <label id="selectProfile" for="selectPhotoProfile" class="hide">
              <input type="file" id="selectPhotoProfile" class="hide" accept="image/jpeg, image/png">
              <img class ="photo-profile" src="./img/photo.png">
            </label>
            <img class="profile-picture" src="${currentUser.photoURL || './img/profile-ico.png'}">
            <p class="user-name" id="name">${currentUser.displayName}</p>
            <input class="hide validity" id="inputName" type="text" value="${currentUser.displayName}" maxlength="30" pattern="([a-zA-ZÁÉÍÓÚñáéíóúÑ]{1,30}\\s*)+">
          </div>
          <h3 class="about-me">Sobre mí</h3>
          <p class="profile-text" id="description">${localStorage.getItem('aboutMe')}</p>
          <div class="location-info">
            <img src="./img/location.png">
            <span id="location">${localStorage.getItem('location')}</span>
          </div>
          <img class="edit-icon" src="./img/edition-icon.png">
          <p class="drop-down hide" id="editName">Editar</p>
          <div class="profile-btn-editions">
            <button id="btnCancel" class="btn-profile hide">Cancelar</button>
            <button id="btnSave" class="btn-profile hide">Guardar</button>
          </div>
        </div>
      </div>
      <div class="timeline">
        <div class="all-posts"></div>
      </div>
    </section>`;

  const aboutMe = viewUserProfile.querySelector('#description');
  const location = viewUserProfile.querySelector('#location');
  const selectPhotoProfile = viewUserProfile.querySelector('#selectPhotoProfile');
  const profilePicture = viewUserProfile.querySelector('.profile-picture');

  let file = '';
  selectPhotoProfile.addEventListener('change', (e) => {
    const input = e.target;
    const reader = new FileReader();
    reader.onload = () => {
      const dataURL = reader.result;
      profilePicture.src = dataURL;
    };
    reader.readAsDataURL(input.files[0]);
    file = e.target.files[0];

    // Botón para cancelar imagen
    // btnCancelImg.classList.remove('hide');
  });

  const menuMobile = viewUserProfile.querySelector('#menu-mobile2');
  const navHome = viewUserProfile.querySelector('.nav-home');
  menuMobile.addEventListener('click', () => {
    navHome.classList.toggle('hide');
  });

  const btnSignOut = viewUserProfile.querySelector('#btnSignOut2');
  btnSignOut.addEventListener('click', () => {
    // changeView('#/signin');
    signOut();
  });

  const btnHome = viewUserProfile.querySelector('#btnGoHome');
  btnHome.addEventListener('click', () => {
    changeView('#/home');
  });

  const editIcon = viewUserProfile.querySelector('.edit-icon');
  const editName = viewUserProfile.querySelector('#editName');
  const btnSave = viewUserProfile.querySelector('#btnSave');
  const name = viewUserProfile.querySelector('#name');
  const btnCancel = viewUserProfile.querySelector('#btnCancel');
  const inputName = viewUserProfile.querySelector('#inputName');
  const selectProfile = viewUserProfile.querySelector('#selectProfile');

  editIcon.addEventListener('click', () => {
    editName.classList.toggle('hide');
  });

  editName.addEventListener('click', () => {
    aboutMe.contentEditable = 'true';
    location.contentEditable = 'true';
    aboutMe.classList.add('input-style');
    name.classList.add('hide');
    location.classList.add('input-style');
    inputName.classList.remove('hide');
    inputName.focus();
    editName.classList.add('hide');
    btnSave.classList.remove('hide');
    btnCancel.classList.remove('hide');
    selectProfile.classList.remove('hide');
  });

  const editableInfo = () => {
    aboutMe.contentEditable = 'false';
    location.contentEditable = 'false';
    aboutMe.classList.remove('input-style');
    location.classList.remove('input-style');
    name.classList.remove('hide');
    inputName.classList.add('hide');
    btnSave.classList.add('hide');
    btnCancel.classList.add('hide');
  };

  btnCancel.addEventListener('click', () => {
    inputName.value = name.textContent;
    getProfileInfo(currentUser.uid).then((doc) => {
      aboutMe.textContent = doc.data().aboutMe;
      location.textContent = doc.data().location;
    });
    editableInfo();
    selectProfile.classList.add('hide');
  });

  inputName.addEventListener('input', () => {
    if (inputName.validity.valid && inputName.value) {
      btnSave.disabled = false;
    } else {
      btnSave.disabled = true;
    }
  });

  btnSave.addEventListener('click', () => {
    if (file) {
      uploadPhotoProfile(file, currentUser.uid);
    }
    editableInfo();
    updateProfileInfo(currentUser.uid, aboutMe.textContent, location.textContent);
    name.textContent = inputName.value;
    localStorage.setItem('aboutMe', aboutMe.textContent);
    localStorage.setItem('location', location.textContent);
    selectProfile.classList.add('hide');
    downLoadPhoto(file.name, currentUser.uid).then((url) => {
      updateUserName(currentUser, inputName.value, url);
    });
  });

  const allPosts = viewUserProfile.querySelector('.all-posts');
  notes.forEach((element) => {
    allPosts.appendChild(eachPost(element));
  });

  return viewUserProfile;
};
