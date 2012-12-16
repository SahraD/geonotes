GeonotesYeoman.Models.NoteModel = Backbone.Model.extend({

    defaults: {
        titre: "Nouvelle note",
        coords: new google.maps.LatLng(0, 0),
        commentaire: "Commentaires sur la note",
        dateCreation: new Date(),
        categorie: "Catégorie"
    },

    initialize: function(){
        console.log("New Note");
    }

});
