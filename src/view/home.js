/* eslint-disable import/no-cycle */
import { changeView } from '../view-controller/router.js';
import { signOut, user } from '../firebase-controller/auth-controller.js';
import { publishComment } from '../firebase-controller/firestore-controller.js';
import { storage } from '../main.js';
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
          <p class="description">Nemo enim ipsam voluptem quia voluptas sit asper aut odit aut fugit.</p>
        </div>
      </div>
      <div class="timeline">
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
        <div class="all-posts" id="allPosts"></div>
      </div>
    </section>`;

  const selectImage = viewSignInUser.querySelector('#selectImage');
  // const showPicture = viewSignInUser.querySelector('#showPicture');
  // const newPost = viewSignInUser.querySelector('#newPost');
  // Vista previa de imagen cargada
  /*
  selectImage.addEventListener('change', (event) => {
    const input = event.target;
    const reader = new FileReader();
    reader.onload = () => {
      const dataURL = reader.result;
      showPicture.src = dataURL;
      newPost.classList.add('hide');
    };
    reader.readAsDataURL(input.files[0]);
    */


  // Seleccionar imagen y guardarla en Storage
  selectImage.addEventListener('change', (e) => {
    // Obtener el archivo
    const file = e.target.files[0];
    // Crea referencia de almacenamiento
    const storageRef = storage.ref(`images/ ${file.name}`);
    // Subir archivo
    storageRef.put(file);
  });

  const menuMobile = viewSignInUser.querySelector('#menu-mobile');
  const navHome = viewSignInUser.querySelector('.nav-home');
  menuMobile.addEventListener('click', () => {
    navHome.classList.toggle('hide');
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
    publishComment(currentUser.displayName, newPost).then(() => {
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
