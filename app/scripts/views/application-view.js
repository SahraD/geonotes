GeonotesYeoman.Views.applicationView = Backbone.View.extend({

    events: {
        "click .btn#saveNewNote": "add_note"
    },

    add_note: function(){
        var titre = $("input#titre").val();
        var commentaires = $("textarea#commentaires").val();
        var categorie = $("select#categories").val();

        alert("Bouton \"save\" cliqué ");

        console.log(titre + " " + commentaires + " " + categorie);
    }

});
