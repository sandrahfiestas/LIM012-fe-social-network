/* eslint-disable import/no-cycle */
import { changeView } from '../view-controller/router.js';
// import { profileInfo } from '../firestore-controller.js';
import { signOut, user, updateUserName } from '../firebase-controller.js';
import { getProfileInfo, updateProfileInfo } from '../firestore-controller.js';

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
<<<<<<< HEAD
<<<<<<< HEAD
          <div class="profileDiv profile-margin">
            <img class="profilePicture" src="./img/profile-ico.png">
            <p class="user-name" id="name">${currentUser.displayName}</p>
            <input class="hide validity" id="inputName" type="text" value="${currentUser.displayName}" maxlength="30" pattern="([a-zA-Z]{2,30}\\s*)+">
          </div>
          <div class="profile-margin">
            <h3>Sobre mí</h3>
            <p class="profile-text" id="description"></p>
            <div class="location-info profile-text">
              <img src="./img/location.png">
              <span id="location"></span>
            </div>
          </div>
          <img class="edit-icon" src="../src/img/edition-icon.png">
          <p class="dropDown hide" id="editName">Editar</p>
          <div class="profile-btn-editions">
            <button id="btnCancel" class="btn-profile hide">Cancelar</button>
            <button id="btnSave" class="btn-profile hide">Guardar</button>
=======
          <div class="profileDiv">
<<<<<<< HEAD
            <div class="profilePicture"></div>
            <p class="userProfile" id="name">${userName}</p>
<<<<<<< HEAD
            <button id="btnSave" class="btn-save hide">Guardar</button>
>>>>>>> Editando nombre
=======
            <button id="btnSave" class="btn-save hide">G</button>
>>>>>>> Enlaces de fotos
          </div>
          
        </div>
<<<<<<< HEAD
=======
        <div class="divWhite">
          <img class ="edit-icon" id="editName" src="../src/img/edition-icon.png">
=======
=======
          <div class="profileDiv profile-margin">
>>>>>>> Boton cancelar
            <img class="profilePicture" src="./img/profile-ico.png">
            <p class="user-name" id="name">${userName}</p>
            <input class="hide" id="inputName" type="text" value="${userName}" pattern="([a-zA-Z]{2,30}\\s*)+">
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
<<<<<<< HEAD
          <p class="dropDown hide" id="editName">Editar</p>
>>>>>>> Campos editables en el perfil
=======
          
>>>>>>> Boton cancelar
        </div>
>>>>>>> Editando nombre
      </div>

      <div class="timeline">
        <div class="newPost"></div>
      </div>
    </section>`;

  const aboutMe = viewUserProfile.querySelector('#description');
  const location = viewUserProfile.querySelector('#location');

  getProfileInfo(currentUser.uid).then((doc) => {
    aboutMe.textContent = doc.data().aboutMe;
    location.textContent = doc.data().location;
  });

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
  const btnCancel = viewUserProfile.querySelector('#btnCancel');

  // const inputName = viewUserProfile.querySelector('#inputName');


  editIcon.addEventListener('click', () => {
    editName.classList.toggle('hide');
  });

  editName.addEventListener('click', () => {
    name.contentEditable = 'true';
    aboutMe.contentEditable = 'true';
    location.contentEditable = 'true';
    aboutMe.classList.add('input-style');
    name.classList.add('input-style');
    location.classList.add('input-style');
    // inputName.classList.remove('hide');
    // inputName.focus();
    name.focus();
    editName.classList.add('hide');
    btnSave.classList.remove('hide');
    btnCancel.classList.remove('hide');

  const editIcon = viewUserProfile.querySelector('.edit-icon');
  const editName = viewUserProfile.querySelector('#editName');
  const btnSave = viewUserProfile.querySelector('#btnSave');
  const name = viewUserProfile.querySelector('#name');
  const aboutMe = viewUserProfile.querySelector('.description');
  const location = viewUserProfile.querySelector('.location');
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

  const saveUser = (nameUser) => {
    const userData = user();
    // console.log(userData);
    console.log(userData);
    // console.log(userData);
    userData.updateProfile({
      displayName: nameUser,
    });
  };

  const editableInfo = () => {
    name.contentEditable = 'false';
    aboutMe.contentEditable = 'false';
    location.contentEditable = 'false';
    aboutMe.classList.remove('input-style');
    name.classList.remove('input-style');
    location.classList.remove('input-style');
    btnSave.classList.add('hide');
    btnCancel.classList.add('hide');
  };

  btnCancel.addEventListener('click', () => {
    editableInfo();
    name.textContent = user().displayName;
  });

  // name.addEventListener('blur', editableInfo);
  btnSave.addEventListener('click', () => {
    editableInfo();
    saveUser(name.textContent);
  });

  const editTextName = () => {
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


  // name.addEventListener('blur', editTextName);
  btnSave.addEventListener('click', editTextName);
  btnCancel.addEventListener('click', () => {
    inputName.value = name.textContent;
    getProfileInfo(currentUser.uid).then((doc) => {
      aboutMe.textContent = doc.data().aboutMe;
      location.textContent = doc.data().location;
    });
    editableInfo();
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
    updateUserName(currentUser, inputName.value);
    updateProfileInfo(currentUser.uid, aboutMe.textContent, location.textContent);
    name.textContent = inputName.value;
  });

  return viewUserProfile;
});
};
