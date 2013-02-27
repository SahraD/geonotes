Geonotes.Collections.NotesCollection = Backbone.Collection.extend({

  model: Geonotes.Models.NoteModel,

  url: 'http://192.168.0.13:8080/war/rest/note',

  parse: function(response) {
    return response.note;
  }

});
