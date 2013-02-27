Geonotes.Views.NotesView = Backbone.View.extend({

	initialize: function() {
		this.collection.on('add', this.addOne, this);
	},

	render: function() {
		this.collection.each( this.addOne, this );
		return this;
	},

	addOne: function(note) {
		var noteView = new Geonotes.Views.Note({ model: note });
		this.$el.append(noteView.render().el);
	}

});