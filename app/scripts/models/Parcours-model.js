Geonotes.Models.ParcoursModel = Backbone.Model.extend({

    defaults : {
        nom: "Nouveau parcours",
        notes: null,
        distance: 0,
        denivele: 0
    },    

    generate_directions: function(map){

        var positions = new Array();
        var notes = this.get("notes");

        notes.each(function(note){

            note.create_marker(map);
            positions.push(note.get("coords"));
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

        var distance = 0;
        
        directionsService.route(request, function(result, status) {

            if (status == google.maps.DirectionsStatus.OK) {
                directionsDisplay.setDirections(result);
                
                distance = result.routes[0].legs[0].distance.value;
            }
        });

        this.set("distance", distance);
    }

});
