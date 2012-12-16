GeonotesYeoman.Views.MapView = Backbone.View.extend({

    el: $("#map_canvas"),

    initialize: function(){

        this.initiate_geolocation();
        this.$el.height($(window).height() - $("#header").height() - $("#footer").height() -10);
    },

    initiate_geolocation: function() {
        this.watchId = navigator.geolocation.watchPosition(this.handle_geolocation_query);
    },

    handle_geolocation_query: function(position){

        window.map.init_map(position);


    },

    init_map: function(position) {
        var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

        var myOptions = {
            zoom: 15,
            center: latlng,
            mapTypeControl: false,
            navigationControlOptions: {
                style: google.maps.ZoomControlStyle.LARGE,
                position: google.maps.ControlPosition.BOTTOM_CENTER
            },
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            streetViewControl: false
        };

        var map = new google.maps.Map(document.getElementById('map_canvas'), myOptions);


        window.allParcours.each(function(parcours){

            //On prend en compte la localisation actuelle
            var notes = parcours.get("notes");
            var location = new GeonotesYeoman.Models.NoteModel();
            location.set("coords", latlng);
            notes.add(location);

            parcours.set("notes", notes);

            parcours.generate_directions(map);

        });
    }

});
