/**
 * Vue globale pour l'utilisateur final. 
 */
Geonotes.Views.UserView = Backbone.View.extend({

	/**
	 * Fonction d'initialisation 
	 * Elle gère la réception de événements et leur distribution
	 */
	initialize: function() {

		Geonotes.tracks.fetch();
		var allTracksView = new Geonotes.Views.TracksView({ collection: Geonotes.tracks }).render();
		$('#allTracks').html(allTracksView.el);
		 
		window.map = new Geonotes.Views.MapView();
	},

	editTrack: function(track) {
		console.log(track);

		var editTrackView = new Geonotes.Views.EditTrackView({ model: track });
	},

	addTrack: function() {
		var addTrackView = new Geonotes.Views.AddTrackView();
	},

	editNote: function(id) {
		var note = Geonotes.notes.get(id);

		var editNoteView = new Geonotes.Views.EditNoteView({ model: note });
	},

	addNote: function(position) {
		var addNoteView = new Geonotes.Views.AddNoteView(position);
	},

	updateMap: function() {
		window.map.initMap();
	},

	updateTracks: function() {
		this.initialize();
	}

});
