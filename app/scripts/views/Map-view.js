Geonotes.Views.MapView = Backbone.View.extend({

    el: $("#map_canvas"),

    theMap: null,

    maPosition: null,
    
    events : {
        "hold" : "add_note"
    },

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

        theMap = new google.maps.Map(document.getElementById('map_canvas'), myOptions);

        maPosition = new Geonotes.Models.NoteModel();
        maPosition.set("titre", "Position actuelle");
        maPosition.set("description", "");
        maPosition.set("coords", latlng);

        maPosition.create_marker(theMap);

        window.map.show_all_notes();
    },

    show_parcours: function(parcours){

        parcours.generate_directions(theMap);
    },

    show_all_notes: function(){

        window.allParcours.each(function(parcours){

            var notes = parcours.get("notes");

            notes.each(function(note){
                note.create_marker(theMap);
            });

        });

    },
    
    add_note: function(event){
        
        var theCoords;
        
        //Comment entrer dans cette fonction ?
        google.maps.event.addListener(theMap, "touchend", function (e) {
            console.log("In google map event");
            var lat = e.latLng.lat();
            var lng = e.latLng.lng();

            theCoords = new google.maps.LatLng(lat, lng);
            
            var newNoteForm = new Geonotes.Views.newNoteFormView(theCoords);
            newNoteForm.render();
        });
    }

});
