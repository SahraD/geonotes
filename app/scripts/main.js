
window.GeonotesYeoman = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  init: function() {

      console.log('Hello from Backbone!');

      //Création en dur de 4 notes et de 2 parcours
      var note1 = new GeonotesYeoman.Models.NoteModel();
      note1.set("titre", "Première note");
      note1.set("coords", new google.maps.LatLng(45.447065,4.386551));
      note1.set("description", "Ceci est ma première note");

      var note2 = new GeonotesYeoman.Models.NoteModel();
      note2.set("titre", "Deuxième note");
      note2.set("coords", new google.maps.LatLng(45.453769,4.391918));
      note2.set("description", "Ceci est ma deuxième note");

      var note3 = new GeonotesYeoman.Models.NoteModel();
      note1.set("titre", "Troisième note");
      note1.set("coords", new google.maps.LatLng(45.441954,4.386354));
      note1.set("description", "Et si on faisait un autre parcours");

      var note4 = new GeonotesYeoman.Models.NoteModel();
      note1.set("titre", "Quatrième note");
      note1.set("coords", new google.maps.LatLng(45.442805,4.399068));
      note1.set("description", "Et si on faisait un autre parcours avec ce point");

      var notes1 = new GeonotesYeoman.Collections.NotesCollection();
      notes1.add(note1);
      notes1.add(note2);

      var notes2 = new GeonotesYeoman.Collections.NotesCollection();
      notes2.add(note3);
      notes2.add(note4);

      var parcours1 = new GeonotesYeoman.Models.ParcoursModel();
      parcours1.set("nom", "1er Parcours");
      parcours1.set("notes", notes1);

      var parcours2 = new GeonotesYeoman.Models.ParcoursModel();
      parcours2.set("nom", "2ème Parcours");
      parcours2.set("notes", notes2);

      window.allParcours = new GeonotesYeoman.Collections.ParcoursAllCollection();
      window.allParcours.add(parcours1);
      window.allParcours.add(parcours2);

      window.parcoursListe = new GeonotesYeoman.Views.ParcoursListView({collection : window.allParcours});
      window.parcoursListe.render();

      //Envoyer les différents parcours en paramètre par la suite
      window.map = new GeonotesYeoman.Views.MapView();
  }
};

$(document).ready(function(){
  GeonotesYeoman.init();
});
