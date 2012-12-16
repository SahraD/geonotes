GeonotesYeoman.Views.ParcoursListView = Backbone.View.extend({

    el: $("#parcours-ul"),

    events: {
        "click .parcours": "show_parcours"
    },

    initialize : function () {
        this.template = $("#parcours_template").html();
    },

    render : function () {

        var renderedContent = Mustache.to_html(
            this.template,
            {parcours : this.collection.toJSON()}
        );

        this.$el.html(renderedContent);
    },

    show_parcours: function(e) {
        e.preventDefault();

        var nom = $(e.currentTarget).attr("id");

        var leParcours = this.collection.find(function(parcours) {

            return parcours.get("nom") === nom;
        })

        window.map.show_parcours(leParcours);
    }

});
