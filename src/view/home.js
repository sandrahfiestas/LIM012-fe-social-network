// eslint-disable-next-line import/no-cycle
import { changeView } from '../view-controller/router.js';
import { signOut} from '../firebase-controller.js';

export default () => {
  const userName = firebase.auth().currentUser.displayName;
  const photoURL = firebase.auth().currentUser.photoURL;

  const viewSignInUser = document.createElement('div');
  viewSignInUser.innerHTML = `
    <header class="header-home">
      <nav class="nav-home">
        <ul class="menu-home">
          <li class="btnHeader" id="btnProfile">Perfil</li>
          <li class="btnHeader" id="btnSignOut">Cerrar sesión</li>
        </ul>
      </nav>
      <button class="btnHome"><a href="#/home"></a></button>
    </header>
    <section class="containerHome">
      <div class="profileSection">
        <div class="coverImage"></div>
        <div class="profile">
          <div class="profileDiv">
            <div class="profilePicture">
                  <img id="profilePhoto" class="imgPhotoURL" src="${photoURL}" alt="">
            </div>
            <p class="userProfile">${userName}</p>
          </div>
          <h3>Sobre mí</h3>
          <p class="description">Nemo enim ipsam voluptem quia voluptas sit asper aut odit aut fugit.</p>
        </div>
        <div class="divWhite"></div>
      </div>
      <div class="timeline">
        <div class="newPost">   
        <div id="" class="">
           <textarea id="postText" rows="9" cols="60" placeholder="¿Qué quisieras compartir?"></textarea>
           <img id="showPicture" class="post-image" src="#" alt=""><br>
             <label for="selectImage">
             <input type="file" id="selectImage" class="upload" accept="image/gif, image/jpeg, image/png">
             <img class ="point-photo" src="./img/add-photo.png">
             </label>
             <img src="./img/status.png">
             <button class="" id="btnToPost">Publicar</button>
        </div>
        </div>
      </div>
    </section>`;

  
  const selectImage = viewSignInUser.querySelector('#selectImage');
  const showPicture = viewSignInUser.querySelector('#showPicture');
  const btnToPost = viewSignInUser.querySelector('#btnToPost');
  


  // Vista previa de imagen cargada
  selectImage.addEventListener('change', (event) => {
    const input = event.target;
    const reader = new FileReader();
    reader.onload = () => {
      const dataURL = reader.result;
      
      showPicture.src = dataURL;
    };
    reader.readAsDataURL(input.files[0]);
 });

 
  // Guarda nombre y post del usuario en la Base de datos
  btnToPost.addEventListener('click', () => {
    const postText = viewSignInUser.querySelector('#postText').value;
    firebase.firestore().collection("publicaciones").add({
    user: userName,
    post: postText,
    })
    .then((docRef) => {
        //  btnToPost.disabled=true;
        console.log("Document written with ID: ", docRef.id);
    })
    .catch((error) => {
        console.error("Error adding document: ", error);
    });
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

  return viewSignInUser;
};
