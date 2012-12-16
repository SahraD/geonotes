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
    },

    create_marker: function(map) {

        var title = '<h2 class="firstHeading">'+this.get("titre")+'</h2>';
        var content = '<p>'+this.get("description")+'</p>';

        var contentDiv = '<div>' + title + content + '</div>';

        var infowindow = new google.maps.InfoWindow({
            content: contentDiv
        });

        var marker = new google.maps.Marker({
            position: this.get("coords"),
            map: map,
            title: this.get("titre")
        });

        google.maps.event.addListener(marker, 'click', function() {
            infowindow.open(map, marker);
        });

    }

});
