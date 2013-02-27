Geonotes.Views.ApplicationView = Backbone.View.extend({

	initialize: function() {

		vent.on('track:edit', this.editTrack, this);
		vent.on('track:add', this.addTrack);
		vent.on('map:addNote', this.addNote, this);

		// Ajouter vent.on('map:hold', this.addNote, this) ou this est la position (normalement)
		// Ajouter vent.on('note:edit', this.editNote, this) ou this est la note (normalement)

		var allTracksView = new Geonotes.Views.TracksView({ collection: Geonotes.tracks }).render();
		$('#allTracks').append(allTracksView.el);
		 
		// Passer en paramètre la liste de parcours {collection: this.collection }
		window.map = new Geonotes.Views.MapView();
	},

	editTrack: function(track) {
		var editTrackView = new Geonotes.Views.EditTrackView({ model: track });
		// plutot faire une fenetre modale ici
		$('#editTrack').html(editTrackView.el);
	},

	addTrack: function() {
		var addTrackView = new Geonotes.Views.AddTrackView();
		// plutot faire une fenetre modale ici
		$('#addTrack').html(addTrackView.el);
	},

	editNote: function(note) {
		var editNoteView = new Geonotes.Views.EditNoteView({ model: note });
		// plutot faire une fenetre modale ici
		$('#editNote').html(editNoteView.el);
	},

	addNote: function(position) {
		var addNoteView = new Geonotes.Views.AddNoteView(position);
	}

});
