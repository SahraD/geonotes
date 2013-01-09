Geonotes.Collections.NotesCollection = Backbone.Collection.extend({

    model: Geonotes.Models.NoteModel,
    
    evaluate_distance: function(){
        var positions = new Array();

        this.each(function(note){
            positions.push(note.get("coords"));
        });
        
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
                distance = result.routes[0].legs[0].distance.value;
            }
        });

        return distance;
    }

});
