/* eslint-disable import/no-cycle */
import { changeView } from '../view-controller/router.js';
import { signOut, user } from '../firebase-controller/auth-controller.js';
import { publishComment, time, getProfileInfo } from '../firebase-controller/firestore-controller.js';
import { uploadImagePost } from '../firebase-controller/storage-controller.js';
import { eachPost } from './post.js';

export default (notes) => {
  const currentUser = user();

  const viewSignInUser = document.createElement('div');
  viewSignInUser.innerHTML = `
    <header class="header-home">
    <label id="menu-mobile" class="menuMobile"></label>
    <nav class="nav-home hide">
      <ul class="menu-home">
        <li class="btnGoProfile" id="btnProfile"><img class="proPicSmall" src="./img/profile-ico.png">Perfil</li>
        <li class="btnGoOut" id="btnSignOut"><img class="icoSignOut" src="./img/sign-out.png">Cerrar sesión</li>
      </ul>
    </nav>
    <img src="./img/logo-voz-amiga.png" alt="Voz Amiga">
    </header>
    <section class="containerHome">
      <div class="profileSection">
        <div class="coverImage"></div>
        <div class="profile">
          <div class="profileDiv">
            <div class="profilePicture">
              <img id="profilePhoto" class="profilePicture" src="./img/profile-ico.png" alt="">
            </div>
            <p class="user-name">${currentUser.displayName}</p>
          </div>
          <h3>Sobre mí</h3>
          <p class="description"></p>
          <div class="location-info profile-text">
              <img src="./img/location.png">
              <span id="location"></span>
            </div>
        </div>
      </div>
      <div class="timeline">
        <div class="container-post">
          <div>
            <img class="profilePicture" src="./img/profile-ico.png" alt="">
          </div>
          <div class="post">
            <textarea class="new-post" id="newPost" placeholder="¿Qué quisieras compartir?"></textarea>
            <img id="showPicture" class="post-image" src="#" alt="">
              <div class="buttons-post">
                <label for="selectImage">
                <input type="file" id="selectImage" class="upload" accept="image/jpeg, image/png">
                <img class ="point-photo" src="./img/add-photo.png">
                </label> 
                <img id="choosePrivacity" src="./img/status.png">
                <button id="btnNewPost" class="button-right">Publicar</button>
              </div>
          </div>
        </div>
        <div class="all-posts" id="allPosts"></div>
      </div>
    </section>`;

  const selectImage = viewSignInUser.querySelector('#selectImage');
  // const showPicture = viewSignInUser.querySelector('#showPicture');
  // const newPost = viewSignInUser.querySelector('#newPost');


  // Selecciona y guarda imagen en el Storage (sin visualización previa)
  selectImage.addEventListener('change', (e) => {
    const file = e.target.files[0];
    uploadImagePost(file, currentUser.uid);
  });

  const menuMobile = viewSignInUser.querySelector('#menu-mobile');
  const navHome = viewSignInUser.querySelector('.nav-home');
  menuMobile.addEventListener('click', () => {
    navHome.classList.toggle('hide');
  });

  const aboutMe = viewSignInUser.querySelector('.description');
  const location = viewSignInUser.querySelector('#location');
  getProfileInfo(currentUser.uid).then((doc) => {
    aboutMe.textContent = doc.data().aboutMe;
    location.textContent = doc.data().location;
  });

  const btnSignOut = viewSignInUser.querySelector('#btnSignOut');
  btnSignOut.addEventListener('click', () => {
    changeView('#/signin');
    signOut();
  });

  const btnProfile = viewSignInUser.querySelector('#btnProfile');
  btnProfile.addEventListener('click', () => {
    changeView('#/profile');
  });

  const btnNewPost = viewSignInUser.querySelector('#btnNewPost');
  btnNewPost.addEventListener('click', () => {
    const newPost = document.querySelector('#newPost').value;
    publishComment(currentUser.uid, currentUser.displayName, newPost, time()).then(() => {
      document.getElementById('newPost').value = '';
    });
  });

  // Leyendo datos del database
  const allPosts = viewSignInUser.querySelector('#allPosts');
  notes.forEach((element) => {
    allPosts.appendChild(eachPost(element));
  });

  return viewSignInUser;
};
