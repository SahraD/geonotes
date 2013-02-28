Geonotes.Views.NotesView = Backbone.View.extend({

	initialize: function() {
		
	},

	render: function() {
		this.collection.each( this.addOne, this );
		return this;
	},

	addOne: function(note) {
		var noteView = new Geonotes.Views.NoteView({ model: note });
		noteView.changeTemplateToCheckbox();
		this.$el.append(noteView.render().el);
	}

});