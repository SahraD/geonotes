/**
 * Vue d'une note
 */
Geonotes.Views.NoteView = Backbone.View.extend({

	template: null,

	/**
	 * Initialisation de la vue
	 * Par défaut, le template est celui de "noteView" : celui lorsque l'on clique sur la carte 
	 */
	initialize: function() {
		this.model.on('destroy', this.unrender, this);
		this.model.on('change', this.render, this);

		this.template = template('noteView');

	},

	/**
	 * Fonction pour changer de template
	 * Utilisée pour l'affichage de la liste de note dans editTrack ou addTrack
	 */
	changeTemplateToCheckbox: function() {
		this.template = template('noteViewCheckbox');
	},

	/**
	 * Pour générer la vue en fonction du modèle
	 */
	render: function() {
		this.$el.html( this.template( this.model.toJSON() ) );
		return this;
	},

	/**
	 * Fonction appelée lorsque l'on clique sur le bouton d'édition de la note
	 */
	editNote: function() {
		vent.trigger('note:edit', this.model);
	}

});
