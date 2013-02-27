Geonotes.Views.EditTrackView = Backbone.View.extend({

	template: template('editTrackTemplate'),

	initialize: function() {
		this.render();

		this.form = this.$('form');
		this.title = this.form.find('#edit_title');
		this.category = this.form.find('#edit_category');
		this.description = this.form.find('#edit_description');
		this.notes = this.form.find('#edit_notes');
	},

	events: {
		'submit form': 'submit',
		'click button.cancel': 'cancel'
	},

	submit: function(e) {
		e.preventDefault();

		this.model.save({
			title: this.title.val(),
			category: this.category.val(),
			description: this.description.val(),
			notes: this.notes.val()
		});

		this.remove();
	},

	cancel: function() {
		this.remove();
	},

	render: function() {
		var html = this.template( this.model.toJSON() );

		this.$el.html(html);
		return this;
	}

});
