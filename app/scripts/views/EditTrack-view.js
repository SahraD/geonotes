Geonotes.Views.EditTrackView = Backbone.View.extend({

	el: '#editTrackModal',

	events: {
		'click #submitEditTrack': 'editTrack',
		'touch #submitEditTrack': 'editTrack'
	},

	initialize: function() {
		$('#editTrackModal').modal('show');

		this.nameTrack = $('#nameEditTrack');
		this.categoryTrack = $('#categoryEditTrack');
		this.descriptionTrack = $('#descriptionEditTrack');
		this.showNotes();

		this.nameTrack.val(this.model.get('name'));
		this.categoryTrack.val(this.model.get('category'));
		this.descriptionTrack.val(this.model.get('description'));
		this.checkNotes();

	},

	editTrack: function(e) {
		e.preventDefault();

		var notes = this.getNotes();

		this.model.save({
			name: this.nameTrack.val(),
			category: this.categoryTrack.val(),
			notes: notes,
			description: this.descriptionTrack.val()
		}, {wait:true});

		Geonotes.tracks.fetch();
		
		$('#editTrackModal').modal('hide');

		vent.trigger('editTrack:trackEdited');

		this.undelegateEvents();

	},

	showNotes: function() {

		Geonotes.notes.fetch();
		var allNotesView = new Geonotes.Views.NotesView({collection : Geonotes.notes }).render();
		$('#allNotesViewEdit').html(allNotesView.el);

	},

	checkNotes: function() {

		var notesCollection = new Geonotes.Collections.NotesCollection;

		var notes = this.model.get('notes');

		_.each( notes,  function(note) { 
		    	
			notesCollection.create(note);
		});

		$("input[type='checkbox']").each( 
		    function() {
		    	if(notesCollection.get($(this).val())){
		    		$(this).attr('checked', true);
		    	}
		    } 
		);
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
