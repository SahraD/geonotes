/**
 * Vue pour gérer l'affichage et les événements liés à la création d'une note
 */
Geonotes.Views.AddNoteView = Backbone.View.extend({

	el: '#addNoteModal',

	events: {
		'click #submitAddNote': 'createNote',
		'touch #submitAddNote': 'createNote'
	},

	/**
	 * Initialisation de la vue
	 * Permet d'afficher la fenêtre modale correspondant à la création d'une note
	 * @param  Array position : position de la note créée
	 */
	initialize: function(position) {
		$('#addNoteModal').modal({show: true});
		this.latitude = position[0];
		this.longitude = position[1];
	},

	/**
	 * Fonction appelée lors de la soumission du formulaire
	 * Récupère les données rentrées dans le formulaire et ajoute la note à la collection
	 * @param event e
	 */
	createNote: function(e) {
		e.preventDefault();

		Geonotes.notes.create({
			name: $('#nameAddNote').val(), 
			description: $('#categoryAddNote').val(), 
			category: $('#descriptionAddNote').val(), 
			latitude: this.latitude, 
			longitude: this.longitude
		});

		this.clearForm();

		$('#addNoteModal').modal('hide');

		vent.trigger('addNote:noteAdded');

		this.undelegateEvents();
	},

	/**
	 * Nettoyage du formulaire une fois la note créée
	 */
	clearForm: function() {
		$('#nameAddNote').val('');
		$('#categoryAddNote').val('');
		$('#descriptionAddNote').val('');
	}

});
