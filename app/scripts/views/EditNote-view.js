Geonotes.Views.EditNoteView = Backbone.View.extend({

  	el: '#editNoteModal',

	events: {
		'click #submitEditNote': 'editNote',
		'touch #submitEditNote': 'editNote'
	},

	initialize: function() {
		$('#editNoteModal').modal();

		console.log(this.model);

		var position = [this.model.get('latitude'), this.model.get('longitude')];

		this.name = $('#nameEditNote');
		this.category = $('#categoryEditNote');
		this.description = $('#descriptionEditNote');
		this.latitude = position[0];
		this.longitude = position[1];

		this.name.val(this.model.get('name'));
		this.description.val(this.model.get('description'));
		this.category.val(this.model.get('category'));

		console.log(position[0]);
	},

	editNote: function(e) {
		e.preventDefault();

		this.model.save({
			name: this.name.val(), 
			description: this.description.val(), 
			category: this.category.val(), 
			latitude: this.latitude, 
			longitude: this.longitude
		});

		this.clearForm();

		$('#editNoteModal').modal('hide');

		vent.trigger('editNote:noteEdited');

		this.undelegateEvents();
	},

	clearForm: function() {
		this.name.val('');
		this.category.val('');
		this.description.val('');
	}

});
