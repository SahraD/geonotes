/**
 * Vue pour les listes de notes
 */
Geonotes.Views.NotesView = Backbone.View.extend({

	/**
	 * Fonction qui génère la vue en fonction de la collection
	 */
	render: function() {
		this.collection.each( this.addOne, this );
		return this;
	},

	/**
	 * Fonction pour générer l'affichage d'une seule note de la collection.
	 */
	addOne: function(note) {
		var noteView = new Geonotes.Views.NoteView({ model: note });
		noteView.changeTemplateToCheckbox();
		this.$el.append(noteView.render().el);
	}

});