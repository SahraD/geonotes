Geonotes.Views.AddNoteView = Backbone.View.extend({

	el: '#addNoteModal',

	events: {
		'click #submitAddNote': 'createNote',
		'touch #submitAddNote': 'createNote'
	},

	initialize: function(position) {
		$('#addNoteModal').modal({show: true});
		this.latitude = position[0];
		this.longitude = position[1];
	},

	createNote: function(e) {
		e.preventDefault();

		Geonotes.notes.create({
			name: $('#nameAddNote').val(), 
			description: $('#categoryAddNote').val(), 
			category: $('#descriptionAddNote').val(), 
			latitude: this.latitude, 
			longitude: this.longitude
		});

		this.clearForm();

		$('#addNoteModal').modal('hide');

		vent.trigger('addNote:noteAdded');

		this.undelegateEvents();
	},

	clearForm: function() {
		$('#nameAddNote').val('');
		$('#categoryAddNote').val('');
		$('#descriptionAddNote').val('');
	}

});
