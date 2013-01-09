
window.Geonotes = {
    Models: {},
    Collections: {},
    Views: {},
    Routers: {},

    init: function() {
        
        var parcours = this.get_notes_and_tracks();

        window.allParcours = new Geonotes.Collections.ParcoursAllCollection();
        
        $.each(parcours, function(index, value){
            window.allParcours.add(value);
        });

        //Affichage de tous les parcours
        window.parcoursListe = new Geonotes.Views.ParcoursListView({collection : window.allParcours});
        window.parcoursListe.render();
        
        //Envoyer les différents parcours en paramètre par la suite
        window.map = new Geonotes.Views.MapView();
        window.application = new Geonotes.Views.applicationView();
    },
    
    get_notes_and_tracks: function(){
        //Création en dur de 4 notes et de 2 parcours en attendant la connexion au serveur 
        var note1 = new Geonotes.Models.NoteModel();
        note1.set("titre", "Première note");
        note1.set("coords", new google.maps.LatLng(45.447065,4.386551));
        note1.set("description", "Ceci est ma première note");
        
        var note2 = new Geonotes.Models.NoteModel();
        note2.set("titre", "Deuxième note");
        note2.set("coords", new google.maps.LatLng(45.453769,4.391918));
        note2.set("description", "Ceci est ma deuxième note");
        
        var note3 = new Geonotes.Models.NoteModel();
        note3.set("titre", "Troisième note");
        note3.set("coords", new google.maps.LatLng(45.441954,4.386354));
        note3.set("description", "Et si on faisait un autre parcours");
        
        var note4 = new Geonotes.Models.NoteModel();
        note4.set("titre", "Quatrième note");
        note4.set("coords", new google.maps.LatLng(45.442805,4.399068));
        note4.set("description", "Et si on faisait un autre parcours avec ce point");
        
        var notes1 = new Geonotes.Collections.NotesCollection();
        notes1.add(note1);
        notes1.add(note2);
        
        var notes2 = new Geonotes.Collections.NotesCollection();
        notes2.add(note3);
        notes2.add(note4);

        console.log(notes2);
        
        var parcours1 = new Geonotes.Models.ParcoursModel();
        parcours1.set("nom", "1er Parcours");
        parcours1.set("notes", notes1);
        parcours1.set("distance", notes1.evaluate_distance());
        console.log(notes1.evaluate_distance());
        var parcours2 = new Geonotes.Models.ParcoursModel();
        parcours2.set("nom", "2ème Parcours");
        parcours2.set("notes", notes2);
        parcours2.set("distance", notes2.evaluate_distance());
        
        var parcours = [parcours1, parcours2];

        return parcours;
    }
};

$(document).ready(function(){
    Geonotes.init();
});
