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
        
        <form id="formularioPost" method="post" action="" enctype="multipart/form-data">
        <div id="" class="">
           <textarea id="postText" name="textarea" rows="9" cols="60" placeholder="¿Qué quisieras compartir?"></textarea>
           <img id="showPicture" class="post-image" src="#" alt="">
           
           <figure class="">
             <label for="selectImage">
             <input type="file" id="selectImage" class="upload" accept="image/gif, image/jpeg, image/png">
             <img src="./img/add-photo.png">
             </label>

             <img src="./img/status.png">
             <input type="submit" id="toPost" value="Publicar">
            </figure>
           

        </div>
       </form>

        </div>
      </div>
    </section>`;

  // Vista previa de imagen cargada
  const selectImage = viewSignInUser.querySelector('#selectImage');
  const showPicture = viewSignInUser.querySelector('#showPicture');

  selectImage.addEventListener('change', (event) => {
    const input = event.target;
    const reader = new FileReader();
    reader.onload = function(){
      const dataURL = reader.result;
      
      showPicture.src = dataURL;
    };
    reader.readAsDataURL(input.files[0]);
 });

  // imgInp.change(() => {
  //   alert ("se cambió de imagen");
  // });

  // function readImage (input) {
  //   if (input.files && input.files[0]) {
  //     let reader = new FileReader();

  //     reader.onload = function(e) {
  //       blah.attr('src', e.target.result); // Renderizando la imagen
  //       console.log(e.target.result);
  //     };

  //     reader.readAsDataURL(input.files[0]);
  //     console.log(blah);
      
  //   }

  // };

  // imgInp.addEventListener('change', () => {
  //   console.log('Se cambió la imagen');
  //   readImage();
  // });










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
