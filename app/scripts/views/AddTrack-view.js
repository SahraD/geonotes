Geonotes.Views.AddTrackView = Backbone.View.extend({

	el: '#addTrack',

	initialize: function() {
		this.title = $('#title');
		this.category = $('#category');
		this.description = $('#description');
		this.notes = $('#notes');
	},

	events: {
		'submit': 'addTrack'
	},

	addTrack: function(e) {
		e.preventDefault();

		this.collection.create({
			title: this.title.val(),
			category: this.category.val(),
			notes: this.notes.val(),
			description: this.description.val()
		}, { wait: true });

		this.clearForm();
	},

	clearForm: function() {
		this.first_name.val('');
		this.category.val('');
		this.description.val('');
		this.notes.val('');
	}

});
