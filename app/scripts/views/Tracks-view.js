/**
 * Vue pour une colelction de parcours
 */
Geonotes.Views.TracksView = Backbone.View.extend({

	tagName: 'ul',

	className: 'nav nav-tabs nav-stacked',

	/**
	 * Initialisation de la vue
	 * Elle est en partie regénérée lorsque la collection de parcours est modifiée
	 */
	initialize: function() {
		this.collection.on('add', this.addOne, this);
	},

	/**
	 * Génération de la vue
	 */
	render: function() {
		this.collection.each( this.addOne, this );
		return this;
	},

	/**
	 * Génération de la vue de chaque parcours de la collection.
	 * @param {Geonotes.Models.TrackModel} track : parcours dont il faut afficher la vue. 
	 */
	addOne: function(track) {
		var trackView = new Geonotes.Views.TrackView({ model: track });
		this.$el.append(trackView.render().el);
	}

});
