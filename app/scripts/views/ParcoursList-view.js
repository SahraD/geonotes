GeonotesYeoman.Views.ParcoursListView = Backbone.View.extend({

    el: $("#parcours-ul"),

    initialize : function () {
        this.template = $("#parcours_template").html();
    },

    render : function () {
        var renderedContent = Mustache.to_html(
            this.template,
            {note : this.collection.toJSON()}
        );

        this.$el.html(renderedContent);
    }

});
