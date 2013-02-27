Geonotes.Views.AddNoteView = Backbone.View.extend({

	el: '.noteModal',

	events: {
		'click #submit': 'createNote',
		'touch #submit': 'createNote'
	},

	initialize: function(position) {
		$('.noteModal').modal({show: true});

		this.name = $('#name');
		this.category = $('#category');
		this.description = $('#description');
		this.latitude = position[0];
		this.longitude = position[1];

		console.log(position[0]);
	},

	createNote: function(e) {
		e.preventDefault();

		var note = new Geonotes.Models.NoteModel({name: this.name.val(), description: this.description.val(), category: this.category.val(), latitude: this.latitude, longitude: this.longitude});
		console.log(note);

		Geonotes.notes.create({
			name: this.name.val(),
			category: this.category.val(),
			description: this.description.val(),
			latitude: this.latitude,
			longitude: this.longitude
		});

		this.clearForm();

		$('.noteModal').modal('hide');

		vent.trigger('addNote:noteAdded');
	},

	clearForm: function() {
		this.name.val('');
		this.category.val('');
		this.description.val('');
	}

});
