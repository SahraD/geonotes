Geonotes.Views.newNoteFormView = Backbone.View.extend({

    el: $("#newNoteForm"),

    events: {
        "click #saveNewNote" : "save_note"
    },

    initialize : function (coords) {

        this.coords = coords;

        this.template = $("#newNoteForm_template").html();
    },

    render : function () {

        var renderedContent = Mustache.to_html(
            this.template
        );

        this.$el.html(renderedContent);

        if(window.appli == "admin"){
            $("#addForm").modal({show: true});
        }
    },

    save_note: function() {
        var titre = $("input#titre").val();
        var commentaires = $("textarea#commentaires").val();
        var categorie = $("select#categories").val();
        var coords = this.coords;

        console.log(coords);


        //TODO : Ajouter les coordonnées
        //TODO : Créer la nouvelle note
        //TODO : Ajouter la note sur la carte
        //TODO : Quitter la fenêtre modale
    }

});
