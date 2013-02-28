Geonotes.Views.MapView = Backbone.View.extend({

    el: $("#map_canvas"),

    initialize: function(){

        vent.on('track:show', this.showTrack, this);

        this.initiateGeolocation();
        this.$el.height($(window).height() - $("#header").height() - $("#footer").height() -10);
    },

    initiateGeolocation: function() {

        var watchId = navigator.geolocation.watchPosition(this.getPositionSuccess, this.getPositionError);
    },

    getPositionSuccess: function(position){

        window.map.initMap(position);
    },

    getPositionError: function() {
		alert("Impossible to get your current position");
		var position = {
			coords: {
				latitude: 0,
				longitude: 0
			}
		};
		window.map.initMap(position);
    },

    initMap: function(position) {

        var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

        var myOptions = {
            zoom: 15,
            center: latlng,
            mapTypeControl: false,
            zoomControl: false,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            streetViewControl: false
        };

        var map = new google.maps.Map(document.getElementById('map_canvas'), myOptions);

        google.maps.event.addListener(map, "click", function (e) {
            console.log("In google map event");
            var lat = e.latLng.lat();
            var lng = e.latLng.lng();

            var position= [lat, lng];

            window.map.addNote(position);
        });

        maPosition = new Geonotes.Models.NoteModel();
        maPosition.set('name', 'Position actuelle');
        maPosition.set('description', '');
        maPosition.set('latitude', position.coords.latitude);
        maPosition.set('longitude', position.coords.longitude);
        maPosition.set('category', '');

        this.showMarker(maPosition, map);
        this.showMarkers(map);

        //Pour créer une variable globale qui correspond à l'objet map de Google
        Geonotes.mapModel = new Geonotes.Models.MapModel;
        Geonotes.mapModel.set("map", map);

        // Créer un listener sur hold qui permet de récupérer la position actuelle
        // Envoi vent.trigger('map:hold', position)
        // Récupérer cela dans la vue globale
        


    },

    addNote: function(position) {
    	vent.trigger('map:addNote', position);
    },

    showTrack: function(track) {

        var map = Geonotes.mapModel.get("map");

        var positions = new Array();
        //Récupérer les notes selon le parcours
        
        // var notes = new Geonotes.Collections.NotesCollection;
        // notes.fetch({url : 'http://192.168.0.13:8080/war/rest/track/' + track.get('trackId') + '/notes'}).then(function() {

        Geonotes.notes.fetch();
        Geonotes.notes.each(function(note){

            var latLng = new google.maps.LatLng(note.get('latitude'), note.get('longitude'));
            positions.push(latLng);
        });

        var directionsDisplay = new google.maps.DirectionsRenderer();
        directionsDisplay.setMap(map);
        var directionsService = new google.maps.DirectionsService();

        var waypoints = [];

        for(var i=1; i<positions.length -1; i++){
            waypoints.push({
                location: positions[i],
                stopover: false
            });
        }

        var request = {
            origin : positions[0],
            destination: positions[positions.length-1],
            waypoints: waypoints,
            travelMode: google.maps.TravelMode.WALKING,
            avoidHighways: true
        };

        
        directionsService.route(request, function(result, status) {

            if (status == google.maps.DirectionsStatus.OK) {
                directionsDisplay.setDirections(result);
            }
        });
    },

    showMarker: function(note, map) {

        var noteView = new Geonotes.Views.NoteView({model: note});
        var contentDiv = noteView.render().el;
        var infowindow = new google.maps.InfoWindow({
            content: contentDiv,
            maxWidth: 500
        });

        //creer marker sur la map
        var coords = new google.maps.LatLng(note.get('latitude'), note.get('longitude'));
        var marker = new google.maps.Marker({
            position: coords,
            map: map,
            title: note.get("titre")
        });

        //ajouter event listener
        google.maps.event.addListener(marker, 'click', function() {
            infowindow.open(map, marker);
        });
    },

    showMarkers: function(map) {
        var self = this;

        //var notes = new Geonotes.Collections.NotesCollection;
        Geonotes.notes.fetch().then(function() {
            Geonotes.notes.each( function(note) {
                self.showMarker(note, map);               
            });
        });
    }

});
