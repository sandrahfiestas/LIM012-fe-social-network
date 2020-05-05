/* eslint-disable import/no-cycle */
import { changeView } from '../view-controller/router.js';
import { signOut } from '../auth-controller.js';
import { publishComment } from '../firestore-controller.js';
import { db, storage } from '../main.js';

export default () => {
  const userName = firebase.auth().currentUser.displayName;
  const photoURL = firebase.auth().currentUser.photoURL;

  const viewSignInUser = document.createElement('div');
  viewSignInUser.innerHTML = `
    <header class="header-home">
    <input type="checkbox" id="menu-mobile" class="hide">
    <label for="menu-mobile" class="menuMobile"></label>
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
              <img id="profilePhoto" class="profilePicture" src="${photoURL}" alt="">
            </div>
            <p class="user-name">${userName}</p>
          </div>
          <h3>Sobre mí</h3>
          <p class="description">Nemo enim ipsam voluptem quia voluptas sit asper aut odit aut fugit.</p>
        </div>
      </div>
      <div class="timeline">
        <div class="post">
        <img id="showPicture" class="post-image" src="#" alt=""><br>
          <textarea class="new-post" id="newPost" placeholder="¿Qué quisieras compartir?"></textarea>
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
    publishComment();
  });

  // Leyendo datos del database

  const allPosts = viewSignInUser.querySelector('#allPosts');
  db.collection('posts').onSnapshot((querySnapshot) => {
    allPosts.innerHTML = '';
    querySnapshot.forEach((doc) => {
      // console.log(`${doc.id} => ${doc.data()}`);
      allPosts.innerHTML += `
      <div class="each-post">
        <p>${doc.data().name}</p>
        <p>${doc.data().post}</p>
        <div class="container-menu-post">
          <input type="checkbox" id="menu-post" class="hide">
          <label for="menu-post" class="label-menu-post"></label>
          <nav class="" id="nav-post">
            <ul class="menu-post">
              <li class="btn-post-edit" id="btnPostEdit">Editar</li>
              <li class="btn-post-delete" id="delete-${doc.id}">Eliminar</li>
            </ul>
          </nav>
        </div>
      </div>
      `;

      const menuPost = viewSignInUser.querySelector('#menu-post');
      menuPost.addEventListener('click', () => {
        const navPost = viewSignInUser.querySelector('#nav-post');
        if (menuPost.checked === true) {
          navPost.classList.remove('hide');
        } else if (menuPost.checked === false) {
          navPost.classList.add('hide');
        }
      });

      // Delete post

      const btnPostDelete = viewSignInUser.querySelector(`#delete-${doc.id}`);
      // const id = doc.id;
      btnPostDelete.addEventListener('click', () => {
        // Borrando datos del database
        db.collection('posts').doc(doc.id).delete().then(() => {
          console.log('Document successfully deleted!');
        })
          .catch((error) => {
            console.error('Error removing document: ', error);
          });
      });
    });
  });

  // const btnViewHome = viewSignInUser.querySelector('#btnHome');
  // btnViewHome.addEventListener('click', () => {
  //   changeView('#/home');
  // });

  return viewSignInUser;
};
