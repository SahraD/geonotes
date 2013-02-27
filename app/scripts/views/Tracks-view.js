Geonotes.Views.TracksView = Backbone.View.extend({

	tagName: 'ul',

	className: 'nav nav-tabs nav-stacked',

	initialize: function() {
		this.collection.on('add', this.addOne, this);
	},

	render: function() {
		this.collection.each( this.addOne, this );
		return this;
	},

	addOne: function(track) {
		var trackView = new Geonotes.Views.TrackView({ model: track });
		this.$el.append(trackView.render().el);
	}

});
