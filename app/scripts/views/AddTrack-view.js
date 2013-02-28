Geonotes.Views.AddTrackView = Backbone.View.extend({

	el: '.trackModal',

	events: {
		'click #submitTrack': 'createTrack',
		'touch #submitTrack': 'createTrack'
	},

	initialize: function() {
		$('.trackModal').modal('show');

		this.nameTrack = $('#nameTrack');
		this.categoryTrack = $('#categoryTrack');
		this.descriptionTrack = $('#descriptionTrack');
		// this.notes = $('#notes');
		this.showNotes();
	},

	createTrack: function(e) {
		e.preventDefault();

		console.log("In add track");

		var notes = new Geonotes.Collections.NotesCollection;

		$("input[type='checkbox']:checked").each( 
		    function() { 
		    	var note = Geonotes.notes.get($(this).val());
				// console.log(note);
				notes.create(note);
		    } 
		);

		console.log(notes);

		Geonotes.tracks.create({
			name: this.nameTrack.val(),
			category: this.categoryTrack.val(),
			notes: notes,
			description: this.descriptionTrack.val()
		});
		
		$('.trackModal').modal('hide');

		vent.trigger('addTrack:trackAdded');

		this.clearForm();
	},

	clearForm: function() {
		this.nameTrack.val('');
		this.categoryTrack.val('');
		this.descriptionTrack.val('');
		//this.notes.val('');
	},

	showNotes: function() {

		console.log("In showNotes");
		Geonotes.notes.fetch();
		var allNotesView = new Geonotes.Views.NotesView({collection : Geonotes.notes }).render();
		$('#allNotesView').html(allNotesView.el);

	}

});
