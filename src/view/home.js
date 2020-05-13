/* eslint-disable import/named */
/* eslint-disable import/no-cycle */
import { changeView } from '../view-controller/router.js';
import { signOut, user } from '../firebase-controller/auth-controller.js';
import { publishPost, getProfileInfo } from '../firebase-controller/firestore-controller.js';
import { uploadImagePost } from '../firebase-controller/storage-controller.js';
import { eachPost } from './post.js';


export default (notes) => {
  const currentUser = user();
  getProfileInfo(currentUser.uid).then((doc) => {
    localStorage.setItem('aboutMe', doc.data().aboutMe);
    localStorage.setItem('location', doc.data().location);
    localStorage.setItem('name', currentUser.displayName);
  });

  const viewSignInUser = document.createElement('div');
  viewSignInUser.innerHTML = `
    <header class="header-home">
    <label id="menu-mobile" class="menu-mobile"></label>
    <nav class="nav-home hide">
      <ul class="menu-home">
        <li class="btn-go-profile" id="btnProfile"><img class="pro-pic-small" src="${currentUser.photoURL || './img/profile-ico.png'}">Perfil</li>
        <li class="btn-go-out" id="btnSignOut"><img class="ico-sign-out" src="./img/sign-out.png">Cerrar sesión</li>
      </ul>
    </nav>
    <img src="./img/logo-voz-amiga.png" alt="Voz Amiga">
    </header>
    <section class="container-home">
      <div class="profile-section">
        <div class="cover-image"></div>
        <div class="profile">
          <div class="profile-photo-name">
            <div class="profile-picture">
              <img id="profilePhoto" class="profile-picture" src="${currentUser.photoURL || './img/profile-ico.png'}" alt="">
            </div>
            <p class="user-name">${localStorage.getItem('name')}</p>
          </div>
          <h3 class="about-me">Sobre mí</h3>
          <p class="profile-text">${localStorage.getItem('aboutMe')}</p>
          <div class="location-info">
            <img src="./img/location.png">
            <span id="location">${localStorage.getItem('location')}</span>
          </div>
        </div>
      </div>
      <div class="timeline">
        <div class="container-create-post">
          <img class="like-picture" src="${currentUser.photoURL || './img/profile-ico.png'}" alt="">
          <div class="post left">
            <textarea class="new-post" id="newPost" placeholder="¿Qué quisieras compartir?"></textarea>
            <img id="showPicture" class="post-new-image" src="#" alt="">
            <button id="btnCancelImg" class="hide cancel-image"></button>
            <div class="buttons-post">
              <div class="options">
                <label for="selectImage">
                  <input type="file" id="selectImage" class="upload" accept="image/jpeg, image/png, image/gif">
                  <img class ="point-photo" src="./img/add-photo.svg">
                </label>
                <div class="container-privacy">
                  <select class="privacy text-1">
                    <option value="0">&#xf0ac</option>
                    <option value="1">&#xf023</option>
                  </select>
                  <i></i>
                </div>
              </div>
              <button id="btnNewPost" class="btn-post">Publicar</button>
            </div>
          </div>
        </div>
        <div class="all-posts"></div>
      </div>
    </section>`;

  const selectImage = viewSignInUser.querySelector('#selectImage');
  const showPicture = viewSignInUser.querySelector('#showPicture');
  const btnCancelImg = viewSignInUser.querySelector('#btnCancelImg');

  let file = '';
  selectImage.addEventListener('change', (e) => {
    // Vista previa de imagen cargada
    const input = e.target;
    const reader = new FileReader();
    reader.onload = () => {
      const dataURL = reader.result;
      showPicture.src = dataURL;

      // Almacena url en localStorage
      localStorage.setItem('image', dataURL);
    };
    reader.readAsDataURL(input.files[0]);
    file = e.target.files[0];

    // Botón para cancelar imagen
    btnCancelImg.classList.remove('hide');
  });

  const menuMobile = viewSignInUser.querySelector('#menu-mobile');
  const navHome = viewSignInUser.querySelector('.nav-home');
  menuMobile.addEventListener('click', () => {
    navHome.classList.toggle('hide');
  });

  const btnSignOut = viewSignInUser.querySelector('#btnSignOut');
  btnSignOut.addEventListener('click', () => {
    changeView('#/signin');
    // localStorage.clear();
    signOut();
  });

  const btnProfile = viewSignInUser.querySelector('#btnProfile');
  btnProfile.addEventListener('click', () => {
    changeView('#/profile');
  });

  const btnNewPost = viewSignInUser.querySelector('#btnNewPost');
  btnNewPost.addEventListener('click', () => {
    const newPost = document.querySelector('#newPost').value;
    const status = viewSignInUser.querySelector('.privacy').value;
    const date = new Date().toLocaleString();
    let imPost = '';
    if (file) {
      imPost = localStorage.getItem('image');
      uploadImagePost(file, currentUser.uid);
      publishPost(currentUser.uid, currentUser.displayName, newPost, imPost, date, status)
        .then(() => {
          document.querySelector('.new-post').value = '';
        });
    } else {
      publishPost(currentUser.uid, currentUser.displayName, newPost, imPost, date, status)
        .then(() => {
          document.querySelector('.new-post').value = '';
        });
    }
  });

  // Leyendo datos del database
  const allPosts = viewSignInUser.querySelector('.all-posts');
  notes.forEach((element) => {
    allPosts.appendChild(eachPost(element));
  });

  // Cancela imagen antes de publicar
  btnCancelImg.addEventListener('click', () => {
    localStorage.removeItem('image');
    showPicture.src = '';
    btnCancelImg.classList.add('hide');
  });

  return viewSignInUser;
};
