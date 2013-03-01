Geonotes.Views.TrackView = Backbone.View.extend({

	tagName: 'li',

	template: template('trackView'),

	events: {
		'click .icon-remove-sign' : 'deleteTrack',
		'click .showTrack' : 'showTrack',
		'click .icon-edit' : 'editTrack'
	},

	initialize: function() {
		this.model.on('destroy', this.unrender, this);
		this.model.on('change', this.render, this);

		var self = this;

		$.when(this.model.evaluateDistance()).then(function(dist) {
			self.model.set('distance', dist);
		});
		

	},

	render: function() {
		this.$el.html( this.template( this.model.toJSON() ) );
		return this;
	},

	unrender: function() {
		this.remove();
	},

	deleteTrack: function() {
		this.model.destroy();
	},

	editTrack: function() {
		vent.trigger('track:edit', this.model);
	},

	showTrack: function() {
		vent.trigger('track:show', this.model);
	}

});
