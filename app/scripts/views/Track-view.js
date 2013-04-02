/**
 * Vue pour un parcours
 */
Geonotes.Views.TrackView = Backbone.View.extend({

	tagName: 'li',

	template: template('trackView'),

	events: {
		'click .icon-remove-sign' : 'deleteTrack',
		'click .showTrack' : 'showTrack',
		'click .icon-edit' : 'editTrack'
	},

	/**
	 * Initialisation
	 */
	initialize: function() {
		this.model.on('destroy', this.unrender, this);
		this.model.on('change', this.render, this);

		var self = this;

		$.when(this.model.evaluateDistance()).then(function(dist) {
			self.model.set('distance', dist);
		});
		

	},

	/**
	 * Fonction générer la vue d'un parcours
	 */
	render: function() {
		var self = this;
		$.when(this.model.evaluateDistance()).then(function(dist) {
			self.model.set('distance', dist);
		});
		this.$el.html( this.template( this.model.toJSON() ) );
		return this;
	},

	/**
	 * Fonctiokn pour ne plus afficher la vue lors de la suppression du parcours
	 */
	unrender: function() {
		this.remove();
	},

	/**
	 * Fonction pour supprimer le parcours
	 */
	deleteTrack: function() {
		this.model.destroy();
	},

	/**
	 * Fonction appelée lorsque l'utilisateur veut editer le parcours
	 */
	editTrack: function() {
		vent.trigger('track:edit', this.model);
	},

	/**
	 * Fonction appelée lorsque l'utilisateur veut afficher le parcours
	 */
	showTrack: function() {
		vent.trigger('track:show', this.model);
	}

});
