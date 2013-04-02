/**
 * Définition du modèle de parcours
 */
Geonotes.Models.TrackModel = Backbone.Model.extend({

    /**
     * Fonction de calcul de distance du parcours. 
     * Cette fonction est une fonction utilisant les API de Google pour le calcul de distance
     * @return distance : distance totale du parcours
     */
	evaluateDistance: function(){
        var positions = new Array();

        var notes = this.get('notes');

        _.each(notes, function(note){
            var latlng = new google.maps.LatLng(note.latitude, note.longitude);
            positions.push(latlng);
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

        var deferred = new $.Deferred();
        directionsService.route(request, function(result, status) {
            if (status == google.maps.DirectionsStatus.OK) {
            	deferred.resolve(result.routes[0].legs[0].distance.value);
            }
        });
        
        return deferred.promise();

        
    }

});
