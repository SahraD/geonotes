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

        var positions = new Array();

        positions.push(latlng);

        window.parcours.each(function(note){

            window.map.create_marker(note, map);

            positions.push(note.get("coords"));

        });



        window.map.generate_directions(positions, map);
    },

    create_marker: function(note, map) {

        //Trouver la note qui correspond à la position
        //Associer texte de la note
        var title = '<h2 class="firstHeading">'+note.get("titre")+'</h2>';
        var content = '<p>'+note.get("description")+'</p>';

        var contentDiv = '<div>' + title + content + '</div>';

        var infowindow = new google.maps.InfoWindow({
            content: contentDiv
        });

        var marker = new google.maps.Marker({
            position: note.get("coords"),
            map: map,
            title: note.get("titre")
        });

        google.maps.event.addListener(marker, 'click', function() {
            infowindow.open(map,marker);
        });

    },


    generate_directions: function(positions, map){

        var directionsDisplay = new google.maps.DirectionsRenderer();
        directionsDisplay.setMap(map);
        var directionsService = new google.maps.DirectionsService();

        var waypoints = [];

        for(var i=1; i<positions.length; i++){
            waypoints.push({
                location: positions[i],
                stopover: false
            });
        }

        var request = {
            origin : positions[0],
            destination: positions[0],
            waypoints: waypoints,
            travelMode: google.maps.TravelMode.WALKING
        };

        directionsService.route(request, function(result, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                directionsDisplay.setDirections(result);
            }
        });

    }

});
