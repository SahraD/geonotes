Geonotes.Collections.TracksCollection = Backbone.Collection.extend({
  
  /**
   * Collection qui a pour modèle les parcours
   */
  model: Geonotes.Models.TrackModel,

  /**
   * Configuration du stockage de cette collection
   */
  localStorage: new Backbone.LocalStorage('tracks')

});
