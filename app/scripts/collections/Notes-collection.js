Geonotes.Collections.NotesCollection = Backbone.Collection.extend({

	/**
	 * Cette collection a pour modèle les notes
	 */
	model: Geonotes.Models.NoteModel,
  
	/**
	 * Configuration de la manière dont sont stockées les notes
	 */
	localStorage: new Backbone.LocalStorage('notes')

});
