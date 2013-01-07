Geonotes.Models.NoteModel = Backbone.Model.extend({

    defaults: {
        titre: "Nouvelle note",
        coords: new google.maps.LatLng(0, 0),
        description: "Commentaires sur la note",
        dateCreation: new Date(),
        categorie: "Catégorie"
    },

    create_marker: function(map) {

        var title = '<h4 class="firstHeading">'+this.get("titre")+'</h4>';
        var content = '<p>'+this.get("description")+'</p>';
        content += '<p><button class="btn btn-mini btn-primary" type="button" id="'+this.get("titre")+'">Lancer parcours</button></p>';

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
