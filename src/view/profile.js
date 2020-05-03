// eslint-disable-next-line import/no-cycle
import { changeView } from '../view-controller/router.js';
import { signOut, user, updateUserName } from '../firebase-controller.js';

export default () => {
  const currentUser = user();

  const viewUserProfile = document.createElement('div');
  viewUserProfile.innerHTML = `
    <header class="header-home">
      <input type="checkbox" id="menu-mobile2" class="hide">
      <label for="menu-mobile2" class="menuMobile"></label>
      <nav class="nav-home hide">
        <ul class="menu-home">
          <li class="btnGoProfile" id="btnGoHome"><img class="proPicSmall" src="./img/home-ico.png">Inicio</li>
          <li class="btnGoOut" id="btnSignOut2"><img class="icoSignOut" src="./img/sign-out.png">Cerrar sesión</li>
        </ul>
      </nav>
      <img src="./img/logo-voz-amiga.png" alt="Voz Amiga">
    </header>
    <section class="containerHome">

      <div class="profileSection">
        <div class="coverImage"></div>

        <div class="profile">
          <div class="profileDiv profile-margin">
            <img class="profilePicture" src="./img/profile-ico.png">
            <p class="user-name" id="name">${currentUser.displayName}</p>
            <input class="hide validity" id="inputName" type="text" value="${currentUser.displayName}" maxlength="30" pattern="([a-zA-Z]{2,30}\\s*)+">
          </div>
          <div class="profile-margin">
            <h3>Sobre mí</h3>
            <p class="profile-text" id="description">Nemo enim ipsam voluptem quia voluptas sit asper aut odit aut fugit.</p>
            <div class="location-info profile-text">
              <img src="./img/location.png">
              <span id="location">Puno, Perú</span>
            </div>
          </div>
          <img class="edit-icon" src="../src/img/edition-icon.png">
          <p class="dropDown hide" id="editName">Editar</p>
          <div class="profile-btn-editions">
            <button id="btnCancel" class="btn-profile hide">Cancelar</button>
            <button id="btnSave" class="btn-profile hide">Guardar</button>
          </div>
          
        </div>
      </div>

      <div class="timeline">
        <div class="newPost"></div>
      </div>
    </section>`;

  const menuMobile = viewUserProfile.querySelector('#menu-mobile2');
  menuMobile.addEventListener('click', () => {
    const navHome = viewUserProfile.querySelector('.nav-home');
    if (menuMobile.checked === true) {
      navHome.classList.remove('hide');
    } else if (menuMobile.checked === false) {
      navHome.classList.add('hide');
    }
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
  const aboutMe = viewUserProfile.querySelector('#description');
  const location = viewUserProfile.querySelector('#location');
  const btnCancel = viewUserProfile.querySelector('#btnCancel');
  const inputName = viewUserProfile.querySelector('#inputName');

  editIcon.addEventListener('click', () => {
    editName.classList.toggle('hide');
  });

  editName.addEventListener('click', () => {
    // name.contentEditable = 'true';
    aboutMe.contentEditable = 'true';
    location.contentEditable = 'true';
    aboutMe.classList.add('input-style');
    name.classList.add('hide');
    // name.classList.add('input-style');
    location.classList.add('input-style');
    inputName.classList.remove('hide');
    inputName.focus();
    // name.focus();
    editName.classList.add('hide');
    btnSave.classList.remove('hide');
    btnCancel.classList.remove('hide');
  });

  const editableInfo = () => {
    name.contentEditable = 'false';
    aboutMe.contentEditable = 'false';
    location.contentEditable = 'false';
    aboutMe.classList.remove('input-style');
    name.classList.remove('hide');
    // name.classList.remove('input-style');
    location.classList.remove('input-style');
    btnSave.classList.add('hide');
    btnCancel.classList.add('hide');
    inputName.classList.add('hide');
  };

  btnCancel.addEventListener('click', () => {
    editableInfo();
    inputName.value = name.textContent;
  });

  inputName.addEventListener('input', () => {
    if (inputName.validity.valid && inputName.value) {
      btnSave.disabled = false;
    } else {
      btnSave.disabled = true;
    }
  });

  btnSave.addEventListener('click', () => {
    editableInfo();
    name.textContent = updateUserName(currentUser, inputName.value);
    name.textContent = inputName.value;
  });

  return viewUserProfile;
};
