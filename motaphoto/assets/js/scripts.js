
window.addEventListener("DOMContentLoaded", () => {

  // MENU BURGER
  function toggleMenu () {  
    const navbar = document.querySelector('.navbar-header');
    const burger = document.querySelector('.burger');
    
    burger.addEventListener('click', (e) => {    
      navbar.classList.toggle('show-nav');
    });    
  };
    
  toggleMenu();


  // MODALE CONTACT

  // Modale
  const modal = document.getElementById('myModal');
  // Bouton contact
  const btn = document.getElementById("menu-item-64");
  // Bouton de fermeture de la modale
  const span = document.getElementsByClassName("close")[0];
  // Bouton contact Page single-photo
  const btnContact = document.getElementById("btn-contact");
  // Champ "ref" du formulaire
  const refInput = document.querySelector('input[name="ref"]');
// const reference = document.getElementById("reference").textContent;
// console.log(reference)

  // Ouverture de la modale au clic sur "contact"
  btn.onclick = function() {
      modal.style.display = "block";
      modal.style.animationName = "fadein";
  }

  // Ouverture de la modale au clic sur le bouton "contact" de la page single-photo
  if ( btnContact != null) {
    btnContact.onclick = function() {
      modal.style.display = "block";
      modal.style.animationName = "fadein";
      // Référence de la photo
      const ref = document.getElementById("reference").textContent;
      refInput.value = ref;
    }
  }

  // Fermeture de la modale au click sur le bouton fermeture
  span.onclick = function() {
      modal.style.animationName = "fadeout";
      setTimeout( () => {
        modal.style.display = "none";
      }, "2000");
  }
  // Fermeture de la modale si on clique n'importe où autour de la modale
  window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.animationName = "fadeout";
        setTimeout( () => {
          modal.style.display = "none";
        }, "2000");
      }
  }


  // Single-page : Affichage de la photo miniature au survol des flèche

  // Flèche gauche
  const arrowLeft = document.getElementById("arrow-left");
  //Flèche droite
  const arrowRight = document.getElementById("arrow-right");
  //Image gauche
  const previousImage = document.getElementById("previous-image");
  //Image droite
  const nextImage = document.getElementById("next-image");


  if( previousImage != null && arrowLeft != null) {
  arrowLeft.addEventListener(
    'mouseenter',
    function(event) {
        previousImage.style.visibility = "visible";
        if ( nextImage != null) {
          nextImage.style.visibility = "hidden";
        }
      }
    )
  }

  if( nextImage != null && arrowRight != null) {
    arrowRight.addEventListener(
      'mouseenter',
      function(event) {
        nextImage.style.visibility = "visible";
        previousImage.style.visibility = "hidden";
      }
    )
  }


})