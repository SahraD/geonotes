
window.GeonotesYeoman = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  init: function() {

      console.log('Hello from Backbone!');

      var note1 = new GeonotesYeoman.Models.NoteModel();
      note1.set("titre", "Première note");
      note1.set("coords", new google.maps.LatLng(45.447065,4.386551));
      note1.set("description", "Ceci est ma première note");

      var note2 = new GeonotesYeoman.Models.NoteModel();
      note2.set("titre", "Deuxième note");
      note2.set("coords", new google.maps.LatLng(45.453769,4.391918));
      note2.set("description", "Ceci est ma deuxième note");

      window.parcours = new GeonotesYeoman.Collections.ParcoursCollection();

      window.parcours.add(note1);
      window.parcours.add(note2);

      window.parcoursListe = new GeonotesYeoman.Views.ParcoursListView({collection : parcours});
      window.parcoursListe.render();

      window.map = new GeonotesYeoman.Views.MapView();
  }
};

$(document).ready(function(){
  GeonotesYeoman.init();
});
