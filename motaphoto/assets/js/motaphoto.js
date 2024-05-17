// // Appels Ajax filtres

// Ajout d'un écouteur d'événement pour exécuter le code une fois que le DOM est complètement chargé
document.addEventListener('DOMContentLoaded', function() {
  // Sélection de la section des filtres par la classe
  let sectionFiltres = document.querySelector('.filtre');
  // Vérification si l'élément existe
  if (sectionFiltres) {
    // Boucle sur chaque identifiant pour ajouter un écouteur d'événement 'change'
    ['categories', 'formats', 'dates'].forEach(id => {
      document.querySelector(`#ajax_call_${id}`).addEventListener('change', getImages);
    });
    // Ajout d'un écouteur d'événement 'click' sur le bouton pour charger plus d'images
    document.querySelector('#load-more-button').addEventListener('click', getImages);
  }
  // Sélection de tous les éléments 'select' pour amélioration de l'interface utilisateur
  let selects = document.querySelectorAll('select');
  // Sélection et mise en cache du bouton pour améliorer la performance
  let loadMoreButton = document.querySelector('#load-more-button');  // Cache this for performance

  // Ajout d'écouteurs sur chaque 'select' pour gérer l'ouverture et l'affichage des options
  selects.forEach(select => {
    select.addEventListener('mousedown', function(e) {
      // Empêche l'événement de se propager et affecter d'autres éléments
      e.stopPropagation();
      // Calcul du nombre d'options à afficher, limité à 10
      let optionCount = select.options.length;
      let calculatedSize = Math.min(optionCount, 10);
      // Fermeture de tous les autres 'select' ouverts, sauf celui actuellement cliqué
      selects.forEach(other => {
        if (other !== select) {
          other.size = 1;
          other.parentElement.classList.remove('opened');
        }
      });
      // Ouverture du 'select' cliqué avec le nombre d'options calculé
      select.size = calculatedSize;
      select.parentElement.classList.add('opened');
    });
  });
  // Écouteur d'événements pour tout le document pour fermer les 'select' si cliqué en dehors
  document.addEventListener('mousedown', function(e) {
    selects.forEach(select => {
      // Fermeture du 'select' si cliqué en dehors de son conteneur
      if (select.parentElement.classList.contains('opened') && !select.parentElement.contains(e.target)) {
        select.size = 1;
        select.parentElement.classList.remove('opened');
      }
    });
  });
});


// Initialisation de la variable de pagination
let page = 2;

// Définition de la fonction getImages appelée lors de changements de filtres ou clics sur le bouton de chargement
function getImages(e) {
  // Sélection et stockage du formulaire de filtres dans une variable
  let form = document.getElementById("form-filters");
      // Création d'un objet FormData pour manipuler facilement les données du formulaire
      let formData = new FormData(form);
      // Ajout d'un paramètre 'action' pour spécifier le type de requête envoyée au serveur
      formData.append('action', 'request_filtered');

      // Condition pour vérifier si l'élément déclencheur de l'événement est le bouton de chargement plus
      if(e.target == document.querySelector('#load-more-button')) {
        // Ajout de la page actuelle à formData pour gérer la pagination
        formData.append( 'paged', page );
        // Incrémentation de la variable de pagination pour charger la page suivante au prochain clic
        page ++;
        // Réinitialisation de la pagination si l'événement provient d'un autre élément que le bouton de chargement
      } else {
        page = 2;
      }

      // Réinitialisation de la taille de l'élément déclencheur à 1 (pour les éléments de type select)
      e.target.size = 1;

      // Envoi des données du formulaire au serveur via fetch avec méthode POST
      fetch(motaphoto_js.ajax_url, {
        method: 'POST',
        body: formData,

      }).then(function(response) {
        // Vérification de la validité de la réponse réseau
        if (!response.ok) {
          throw new Error('Network response error.');
        }
   
        // Conversion de la réponse en JSON
        return response.json();
      }).then(function(data) {
        // Condition pour gérer l'affichage du bouton de chargement plus en fonction des résultats trouvés
        if (data.found_posts < page * 12 - 12) {
          document.querySelector('#load-more-button').style.display = "none";
        } else {
          document.querySelector('#load-more-button').style.display = "block";
        }
        // Effacement du contenu actuel si l'événement ne provient pas du bouton de chargement plus
        if (e.target != document.querySelector('#load-more-button')) {

          document.querySelector("#ajax_return").innerHTML = "";
        }
        // Insertion du HTML renvoyé par le serveur dans l'élément de destination si les données sont valides
        if( data != false) {
            document.querySelector('#ajax_return').insertAdjacentHTML('beforeend', data.my_html);
        } else {
          // Insertion d'un message si aucune donnée correspondante n'est trouvée
          document.querySelector('#ajax_return').insertAdjacentHTML('beforeend', '<div> Aucune photo ne correspond à ces critères </div>');
          // cacher le bouton quand il n'y a plus de photos à charger
          document.querySelector('#load-more-button').style.display = "none";
        }
        // comment enlever ici le bouton de chargement si le nombre de photos est inférieur à 12 ?

      }).catch(function(error) {
        // Affichage en console d'une erreur en cas de problème avec l'opération fetch
        console.error('There was a problem with the fetch operation: ', error);
      });
}
