(function() {

	window.Geonotes = {
	  Models: {},
	  Collections: {},
	  Views: {},
	  Routers: {},
	};

	window.vent = _.extend({}, Backbone.Events);

	window.template = function(id) {
		return _.template( $('#' + id).html() );
	};

})();
