/**
 * Vue de la carte
 */
Geonotes.Views.MapView = Backbone.View.extend({

    el: $("#map_canvas"),

    /**
     * Initialisation
     */
    initialize: function(){

        vent.on('track:show', this.showTrack, this);

        //Création d'une variable gloable dans l'application pour gérer les positions
        Geonotes.mapModel = new Geonotes.Models.MapModel;
        Geonotes.mapModel.set('latitude', 0);
        Geonotes.mapModel.set('longitude', 0);

        this.initiateGeolocation();
        if(window.user == true) {
            this.$el.height($(window).height() - $("#header").height() - $("#footer").height() -40);
        }
        else {
            this.$el.height($(window).height() - $("#header").height() - $("#footer").height() -10);
        }

    },

    /**
     * Fonction pour récupérer la position actuelle
     */
    initiateGeolocation: function() {

        var watchId = navigator.geolocation.getCurrentPosition(this.getPositionSuccess, this.getPositionError);
    },

    /**
     * Fonction appelée en cas de succès de récupérartion de la position
     * @param  {Object} position : position actuelle
     */
    getPositionSuccess: function(position){

        Geonotes.mapModel.set('latitude', position.coords.latitude);
        Geonotes.mapModel.set('longitude', position.coords.longitude);
        window.map.initMap();
    },

    /**
     * Fonction appelée en cas de probème lors de la récupération de la position
     */
    getPositionError: function() {
		alert("Impossible to get your current position");
		
		window.map.initMap();
    },

    /**
     * Initialisation de la vue de la carte une fois l'initialisation de la position effectuée. 
     * Utilisation de l'APIv3 de Google Maps
     */
    initMap: function() {

        var latlng = new google.maps.LatLng(Geonotes.mapModel.get('latitude'), Geonotes.mapModel.get('longitude'));

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
            var lat = e.latLng.lat();
            var lng = e.latLng.lng();

            var position= [lat, lng];

            window.map.addNote(position);
        });

        maPosition = new Geonotes.Models.NoteModel();
        maPosition.set('name', 'Position actuelle');
        maPosition.set('description', '');
        maPosition.set('latitude', Geonotes.mapModel.get('latitude'));
        maPosition.set('longitude', Geonotes.mapModel.get('longitude'));
        maPosition.set('category', '');

        this.showMarker(maPosition, map, '../img/purple_markerP.png');
        this.showMarkers(map);

        var directionsDisplay = new google.maps.DirectionsRenderer();
        directionsDisplay.setMap(map);
        var directionsService = new google.maps.DirectionsService();

        // On ajoute des propriétés à notre variable globale pour gérer la sauvegarde de la carte
        Geonotes.mapModel.set("map", map);
        Geonotes.mapModel.set("directionsDisplay", directionsDisplay);
        Geonotes.mapModel.set("directionsService", directionsService);

    },

    /**
     * Fonction appelée lorsque l'utilisateur clique sur la carte
     * @param {Array} position : position cliquée sur la carte
     */
    addNote: function(position) {
    	vent.trigger('map:addNote', position);
    },

    /**
     * Fonction appelée lorsque l'utilsateur clique sur un parcours dans la liste
     * @param  {Geonotes.Models.TrackModel} track : parcours à afficher
     */
    showTrack: function(track) {

        // On récupère des variables initialisées lors de initMap
        var map = Geonotes.mapModel.get("map");
        var directionsService = Geonotes.mapModel.get("directionsService");
        var directionsDisplay = Geonotes.mapModel.get("directionsDisplay");

        var positions = new Array();

        Geonotes.notes.fetch();

        var notesCollection = new Geonotes.Collections.NotesCollection;

        var notes = track.get('notes');
        console.log(notes);

        _.each(notes, function(note){
            notesCollection.push(note);
        });

        notesCollection.each( function(note) {
            var latLng = new google.maps.LatLng(note.get('latitude'), note.get('longitude'));
            positions.push(latLng);
        });

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

    /**
     * Fonction pour afficher un marker sur la carte pour une note
     * @param  {Geonotes.Models.NoteModel}  note : note que l'on doit afficher sur la carte
     * @param  {google.maps.Map}            map  : carte sur laquelle on doit afficher la note
     * @param  {String}                     icon : style que du marker que l'on doit afficher (optionel)
     */
    showMarker: function(note, map, icon) {

        var noteView = new Geonotes.Views.NoteView({model: note});
        var contentDiv = noteView.render().el;
        var infowindow = new google.maps.InfoWindow({
            content: contentDiv,
            maxWidth: 500
        });

        var coords = new google.maps.LatLng(note.get('latitude'), note.get('longitude'));
        if(icon){
            var marker = new google.maps.Marker({
                position: coords,
                map: map,
                title: note.get("titre"),
                icon: icon
            });
        }
        else {
            var marker = new google.maps.Marker({
                position: coords,
                map: map,
                title: note.get("titre")
            });
        }

        google.maps.event.addListener(marker, 'click', function() {
            infowindow.open(map, marker);
        });
    },

    /**
     * Fonction pour afficher toutes les notes sur la carte
     * @param  {google.maps.Map} map : carte sur laquelle afficher les notes
     */
    showMarkers: function(map) {
        var self = this;

        Geonotes.notes.fetch().then(function() {
            Geonotes.notes.each( function(note) {
                self.showMarker(note, map);               
            });
        });
    }

});
