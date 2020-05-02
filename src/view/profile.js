// eslint-disable-next-line import/no-cycle
import { changeView } from '../view-controller/router.js';
import { signOut, user } from '../firebase-controller.js';

export default () => {
  const userName = user().displayName;

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
            <p class="user-name" id="name">${userName}</p>
            <input class="hide validity" id="inputName" type="text" value="${userName}" maxlength="30" pattern="([a-zA-Z]{2,30}\\s*)+">
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

<<<<<<< HEAD
<<<<<<< HEAD
  const editIcon = viewUserProfile.querySelector('.edit-icon');
  const editName = viewUserProfile.querySelector('#editName');
  const btnSave = viewUserProfile.querySelector('#btnSave');
  const name = viewUserProfile.querySelector('#name');
  const aboutMe = viewUserProfile.querySelector('#description');
  const location = viewUserProfile.querySelector('#location');
  const btnCancel = viewUserProfile.querySelector('#btnCancel');
<<<<<<< HEAD
  // const inputName = viewUserProfile.querySelector('#inputName');
<<<<<<< HEAD

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
=======
=======
  const editIcon = viewUserProfile.querySelector('.edit-icon');
>>>>>>> Campos editables en el perfil
  const editName = viewUserProfile.querySelector('#editName');
  const btnSave = viewUserProfile.querySelector('#btnSave');
  const name = viewUserProfile.querySelector('#name');
  const aboutMe = viewUserProfile.querySelector('.description');
  const location = viewUserProfile.querySelector('.location');
=======
>>>>>>> Boton cancelar
=======
  const inputName = viewUserProfile.querySelector('#inputName');
>>>>>>> Permitiendo solo letras en el nombre al editar el perfil

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
<<<<<<< HEAD
    // name.classList.remove('input-style');
>>>>>>> Editando nombre
=======
    btnCancel.classList.remove('hide');
>>>>>>> Boton cancelar
  });

  const saveUser = (nameUser) => {
    const userData = user();
<<<<<<< HEAD
<<<<<<< HEAD
    // console.log(userData);
=======
    console.log(userData);
>>>>>>> Editando nombre
=======
    // console.log(userData);
>>>>>>> Campos editables en el perfil
    userData.updateProfile({
      displayName: nameUser,
    });
  };

<<<<<<< HEAD
<<<<<<< HEAD
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
=======
  const editTextName = () => {
=======
  const editableInfo = () => {
>>>>>>> Boton cancelar
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

<<<<<<< HEAD
  // name.addEventListener('blur', editTextName);
  btnSave.addEventListener('click', editTextName);
>>>>>>> Editando nombre
=======
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
    name.textContent = saveUser(inputName.value);
    name.textContent = inputName.value;
  });
>>>>>>> Boton cancelar

  return viewUserProfile;
};
