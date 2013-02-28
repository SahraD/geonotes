Geonotes.Views.NoteView = Backbone.View.extend({

	template: null,

	initialize: function() {
		this.model.on('destroy', this.unrender, this);
		this.model.on('change', this.render, this);

		this.template = template('noteView');

	},

	changeTemplateToCheckbox: function() {
		this.template = template('noteViewCheckbox');
	},

	render: function() {
		this.$el.html( this.template( this.model.toJSON() ) );
		return this;
	},

	unrender: function() {
		this.remove();
	},

	deleteNote: function() {
		ths.model.destroy();
	},

	editNote: function() {
		vent.trigger('note:edit', this.model);
	},

	showNote: function() {
		vent.trigger('note:show', this.model);
	}

});
