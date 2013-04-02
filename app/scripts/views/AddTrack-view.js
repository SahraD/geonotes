/**
 * Vue pour gérer l'affichage et les événements liés à la création d'un parcours
 */
Geonotes.Views.AddTrackView = Backbone.View.extend({

	el: '#addTrackModal',

	events: {
		'click #submitAddTrack': 'createTrack',
		'touch #submitAddTrack': 'createTrack'
	},

	/**
	 * Fonction d'initialisation de la vue pour l'ajout d'un parcours. 
	 * Affiche la fenêtre modale contenant le formulaire
	 */
	initialize: function() {

		$('#addTrackModal').modal();

		console.log("Hello boy, I'm hidden !!");

		this.nameTrack = $('#nameAddTrack');
		this.categoryTrack = $('#categoryAddTrack');
		this.descriptionTrack = $('#descriptionAddTrack');
		this.showNotes();

		this.clearForm();
	},

	/**
	 * Fonction appelée lors de la soumission du formulaire
	 * Récupère toutes les valeurs entrées pour créer un parcours
	 * Ajout de ce parcours à la collection
	 * @param  event e 
	 */
	createTrack: function(e) {
		e.preventDefault();

		var notes = this.getNotes();
		console.log(notes);

		Geonotes.tracks.create({
			name: this.nameTrack.val(),
			category: this.categoryTrack.val(),
			notes: notes,
			description: this.descriptionTrack.val()
		}, {wait:true});

		Geonotes.tracks.fetch();
		
		$('#addTrackModal').modal('hide');

		vent.trigger('addTrack:trackAdded');

		this.clearForm();

		this.undelegateEvents();
	},

	/**
	 * Fonction de nettoyage du formulaire d'ajout de parcours
	 */
	clearForm: function() {
		this.nameTrack.val('');
		this.categoryTrack.val('');
		this.descriptionTrack.val('');
	},

	/**
	 * Fonction qui permet d'afficher toutes les notes disponibles 
	 * La vue générée est une liste de checkbox suivies par les noms des notes
	 */
	showNotes: function() {
		Geonotes.notes.fetch();
		var allNotesView = new Geonotes.Views.NotesView({collection : Geonotes.notes }).render();
		$('#allNotesView').html(allNotesView.el);

	},

	/**
	 * Fonction qui récupère toutes les notes ayant été cochées
	 * @return Geonotes.Collections.NotesCollection : une collection de notes
	 */
	getNotes: function() {
		var notes = new Geonotes.Collections.NotesCollection;

		$("input[type='checkbox']:checked").each( 
		    function() { 
		    	var note = Geonotes.notes.get($(this).val());
				notes.add(note);
		    } 
		);

		return notes;
	}

});
