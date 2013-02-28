Geonotes.Views.UserView = Backbone.View.extend({

	initialize: function() {

		// vent.on('track:edit', this.editTrack, this);
		// vent.on('track:add', this.addTrack);
		// vent.on('map:addNote', this.addNote, this);
		// vent.on('addNote:noteAdded', this.updateMap)
		// vent.on('editNote:noteEdited', this.updateMap)
		// vent.on('addTrack:trackAdded', this.updateTracks)
		// vent.on('editTrack:trackEdited', this.updateTracks)
		// vent.on('note:edit', this.editNote, this) //ou this est l'id de la note

		Geonotes.tracks.fetch();
		// var allTracksView = new Geonotes.Views.TracksView({ collection: Geonotes.tracks }).render();
		// $('#allTracks').html(allTracksView.el);
		 
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
