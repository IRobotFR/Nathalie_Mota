window.addEventListener("DOMContentLoaded", () => {


  // Lightbox
  
    // Récupération de l'icône plein écran
    const iconFullscreen = document.getElementById('icone-plein-ecran');
    let iconFullscreenRecommandations = document.querySelectorAll('.icone-plein-ecran.icone-plein-ecran-recommadations');
    // Récupération de l'élément de la lightbox
    const lightbox = document.getElementById('lightbox');
    // Récupération du bouton pour fermer la lightbox
    const btnCloseLightbox = document.querySelector('.lightbox_close');
  
    // Récupération des éléments pour afficher la référence et la catégorie dans la lightbox
    let lightboxRefElement = document.querySelector(".lightbox-ref");
    let lightboxCatElement = document.querySelector(".lightbox-categorie")
  
    let refValue ="";
    let catValue ="";
  
    // Ajout d'un écouteur d'événement sur l'icône plein écran pour ouvrir la lightbox
    if(iconFullscreen != null ) {
      iconFullscreen.addEventListener("click",function(e) {
        // Affichage de la lightbox avec un effet de fondu
        lightbox.style.display = "block";
        lightbox.style.animationName = "fadein";
       // Récupération et affectation de l'image à afficher dans la lightbox
       let src = e.target.parentElement.parentElement.parentElement.querySelector(".photo img").dataset.src;
       let img = document.getElementById("img-lightbox");
       img.src = src;
        }
      )
    }
    // Fonction pour gérer l'ouverture de la lightbox à partir des recommandations  
    function openLightbox(e) {
      // Récupération et affectation de l'image à afficher dans la lightbox
      let src = e.target.dataset.src;
      let img = document.getElementById("img-lightbox");
      img.src = src;

      // Récupération de la référence et de la catégorie associées à l'image
      let parentImageGalerie = e.target.parentElement.parentElement;
      let contenuRefElement = parentImageGalerie.querySelector(".contenu-ref");
      let contenuCatElement = parentImageGalerie.querySelector(".contenu-categorie");
  
      refValue = contenuRefElement.textContent;
      catValue = contenuCatElement.textContent;
  
      lightboxRefElement.textContent = refValue;
      lightboxCatElement.textContent = catValue;
  
      // Affichage de la lightbox avec animation
      lightbox.style.display = "block";
      lightbox.style.animationName = "fadein";
  
      // Fonction pour gérer la navigation dans la lightbox
      // Flèche précédente
      let lightboxPrev = document.querySelector('.lightbox_prev');
      // Flèche suivante
      let lightboxNext = document.querySelector('.lightbox_next');
  
      lightboxPrev.addEventListener('click', lightboxNav );
      lightboxNext.addEventListener('click', lightboxNav );
  
      // Récupération de toutes les images pour permettre la navigation
      let allGaleriePosts = document.querySelectorAll('.galerie-post .wp-post-image');
      let allGalerie = document.querySelectorAll('.page-recommandations_photo_img');
  console.log(allGaleriePosts);
      let allGaleriePostsSrc = [];
      allGaleriePosts.forEach((element)=>{
        allGaleriePostsSrc.push(element.getAttribute('src'));
      });
  
      // Fonction pour gérer la navigation dans la lightbox
      function lightboxNav(e) {
        // Récupération de l'image actuelle et de son index
        let srcCurrentPicture = document.getElementById('img-lightbox').src;
        let currentIndex = allGaleriePostsSrc.indexOf(srcCurrentPicture);
  
        // Gestion des clics sur les flèches pour changer l'image affichée
        if( e.target == lightboxPrev && currentIndex > 0) {
          currentIndex--
        } else if( e.target == lightboxNext && currentIndex < allGaleriePostsSrc.length -1) {
          currentIndex++;
        }
        // Gestion de la visibilité des flèches selon la position dans la galerie
        if( currentIndex == 0) {
          lightboxPrev.style.visibility = "hidden"; 
        } else {
          lightboxPrev.style.visibility = "visible";
        }
          if( currentIndex == allGaleriePostsSrc.length -1) {
          lightboxNext.style.visibility = "hidden"; 
        } else {
          lightboxNext.style.visibility = "visible";
        }
        
        // Changement de l'image et mise à jour des informations de référence et catégorie
        img.src = allGaleriePostsSrc[currentIndex];
        // console.log(allGalerie[currentIndex].querySelector(".contenu-ref").textContent);
        // Référence
        lightboxRefElement.textContent = allGalerie[currentIndex].querySelector(".contenu-ref").textContent;
        // Catégorie
        lightboxCatElement.textContent = allGalerie[currentIndex].querySelector(".contenu-categorie").textContent;
      }
    }
    // ajout 
    document.addEventListener('click', function(e) {
      if (e.target.matches('.icone-plein-ecran, .icone-plein-ecran *')) {
        openLightbox(e);
      }
    });
    
  
    // Ajout d'écouteurs d'événements sur les icônes de plein écran des recommandations pour ouvrir la lightbox
    iconFullscreenRecommandations.forEach((element) =>
      element.addEventListener("click", openLightbox)
    )
  
    // Gestion de la fermeture de la lightbox
    btnCloseLightbox.onclick = function(e) {
      lightbox.style.animationName = "fadeout";
      setTimeout( () => {
        lightbox.style.display = "none";
      }, "1000");
    };
  
  })