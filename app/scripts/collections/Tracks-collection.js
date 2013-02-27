Geonotes.Collections.TracksCollection = Backbone.Collection.extend({

  model: Geonotes.Models.TrackModel,

  url: 'http://192.168.0.13:8080/war/rest/track',

  parse: function(response) {
    return response.track;
  }

});
