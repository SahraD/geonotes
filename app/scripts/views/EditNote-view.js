/**
 * Vue pour l'édition d'une note
 * @type {[type]}
 */
Geonotes.Views.EditNoteView = Backbone.View.extend({

  	el: '#editNoteModal',

	events: {
		'click #submitEditNote': 'editNote',
		'touch #submitEditNote': 'editNote'
	},

	/**
	 * Initialise la vue en affichant la fenêtre modale et en remplissant les champs correspondant à la note
	 */
	initialize: function() {
		$('#editNoteModal').modal();

		var position = [this.model.get('latitude'), this.model.get('longitude')];

		this.name = $('#nameEditNote');
		this.category = $('#categoryEditNote');
		this.description = $('#descriptionEditNote');
		this.latitude = position[0];
		this.longitude = position[1];

		this.name.val(this.model.get('name'));
		this.description.val(this.model.get('description'));
		this.category.val(this.model.get('category'));
	},

	/**
	 * Fonction appelée lors de la soumission du formulaire
	 * @param  {event} e 
	 */
	editNote: function(e) {
		e.preventDefault();

		this.model.save({
			name: this.name.val(), 
			description: this.description.val(), 
			category: this.category.val(), 
			latitude: this.latitude, 
			longitude: this.longitude
		});

		this.clearForm();

		$('#editNoteModal').modal('hide');

		vent.trigger('editNote:noteEdited');

		this.undelegateEvents();
	},

	/**
	 * Fonction de nettoyage du formulaire
	 */
	clearForm: function() {
		this.name.val('');
		this.category.val('');
		this.description.val('');
	}

});
