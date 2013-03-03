/**
 * Vue gloable de l'interface administrateur
 */
Geonotes.Views.ApplicationView = Backbone.View.extend({

	/**
	 * Initialisation de la vue administrateur
	 * Cette vue récupère (presque) tous les événements et les traite selon le cas
	 */
	initialize: function() {

		vent.on('track:edit', this.editTrack, this); // ou this est l'id du parcours
		vent.on('track:add', this.addTrack);
		vent.on('map:addNote', this.addNote, this);
		vent.on('addNote:noteAdded', this.updateMap)
		vent.on('editNote:noteEdited', this.updateMap)
		vent.on('addTrack:trackAdded', this.updateTracks)
		vent.on('editTrack:trackEdited', this.updateTracks)
		vent.on('note:edit', this.editNote, this) //ou this est l'id de la note

		Geonotes.tracks.fetch();
		var allTracksView = new Geonotes.Views.TracksView({ collection: Geonotes.tracks }).render();
		$('#allTracks').html(allTracksView.el);
		 
		window.map = new Geonotes.Views.MapView();
	},

	/**
	 * Fonction appelée lorsque l'utilisateur veut éditer un parcours
	 * Elle génère la vue d'édition d'un parcours
	 * @param  {Geonotes.Models.TrackModel} track : parcours à éditer
	 */
	editTrack: function(track) {
		var editTrackView = new Geonotes.Views.EditTrackView({ model: track });
	},

	/**
	 * Fonction appelée lorsque l'utilisateur veut ajouter un groupe
	 */
	addTrack: function() {
		var addTrackView = new Geonotes.Views.AddTrackView();
	},

	/**
	 * Fonction appelée lorsque l'utilisateur veut editer une note
	 * @param  {String} id : identifiant de la note à éditer
	 */
	editNote: function(id) {
		var note = Geonotes.notes.get(id);

		var editNoteView = new Geonotes.Views.EditNoteView({ model: note });
	},

	/**
	 * Fonction appelée lorsque l'utilisateur veut ajouter une note
	 * @param {Array} position : position de la note à ajouter
	 */
	addNote: function(position) {
		var addNoteView = new Geonotes.Views.AddNoteView(position);
	},

	/**
	 * Fonction appelée une fois une note créée pour rafraîchir la carte et les notes qui y figurent
	 */
	updateMap: function() {
		window.map.initMap();
	},

	/**
	 * Fonction appelée pour rafraîchir la liste des parcours une fois qu'un parcours est ajouté
	 */
	updateTracks: function() {
		this.initialize();
	}

});
