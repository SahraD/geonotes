/**
 * Vue de l'édition du parcours
 */
Geonotes.Views.EditTrackView = Backbone.View.extend({

	el: '#editTrackModal',

	events: {
		'click #submitEditTrack': 'editTrack',
		'touch #submitEditTrack': 'editTrack'
	},

	/**
	 * Fonction d'initialisation de la vue
	 * Affiche la fenêtre modale, remplit les champs et coche les notes liées au parcours
	 */
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

	/**
	 * Fonction appelée lors de la soumission du formulaire
	 * Récupère toutes les données rentrées et sauvegarde le parcours ainsi modifié
	 * @param  {event} e 
	 */
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

	/**
	 * Affichage de toutes les notes : checkbox et nom de la note 
	 */
	showNotes: function() {

		Geonotes.notes.fetch();
		var allNotesView = new Geonotes.Views.NotesView({collection : Geonotes.notes }).render();
		$('#allNotesViewEdit').html(allNotesView.el);

	},

	/**
	 * Coche toutes les notes qui étaient déjà présentent dans le parcours que l'on modifie
	 */
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

	/**
	 * Récupère les notes cochées dans le formulaire
	 * @return {Geonotes.Collections.NotesCollection} collection des notes cochées.
	 */
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
