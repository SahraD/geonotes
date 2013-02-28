Geonotes.Views.AddTrackView = Backbone.View.extend({

	el: '#addTrackModal',

	events: {
		'click #submitAddTrack': 'createTrack',
		'touch #submitAddTrack': 'createTrack'
	},

	initialize: function() {

		$('#addTrackModal').modal();

		console.log("Hello boy, I'm hidden !!");

		this.nameTrack = $('#nameAddTrack');
		this.categoryTrack = $('#categoryAddTrack');
		this.descriptionTrack = $('#descriptionAddTrack');
		this.showNotes();

		this.clearForm();
	},

	createTrack: function(e) {
		e.preventDefault();

		var notes = this.getNotes();
		console.log(notes);

		Geonotes.tracks.create({
			name: this.nameTrack.val(),
			category: this.categoryTrack.val(),
			notes: notes,
			description: this.descriptionTrack.val()
		}, {wait:true});

		Geonotes.tracks.fetch();
		
		$('#addTrackModal').modal('hide');

		vent.trigger('addTrack:trackAdded');

		this.clearForm();

		this.undelegateEvents();
	},

	clearForm: function() {
		this.nameTrack.val('');
		this.categoryTrack.val('');
		this.descriptionTrack.val('');
	},

	showNotes: function() {
		Geonotes.notes.fetch();
		var allNotesView = new Geonotes.Views.NotesView({collection : Geonotes.notes }).render();
		$('#allNotesView').html(allNotesView.el);

	},

	getNotes: function() {
		var notes = new Geonotes.Collections.NotesCollection;

		$("input[type='checkbox']:checked").each( 
		    function() { 
		    	var note = Geonotes.notes.get($(this).val());
				notes.add(note);
		    } 
		);

		return notes;
	}

});
