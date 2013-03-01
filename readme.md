# Application Géonotes

Ce repo contient les fichiers du groupe Matthis Duclos/Alexandre Laurent pour le projet d'IHM

Nous avons utilisé, comme demandé dans le sujet, Backbone pour la partie JavaScript et avons choisi d'utiliser Twitter Bootstrap pour générer l'affichage en responsive design. 

## Modèles
Notre application doit être capable de stocker deux types de données : des notes et des parcours. Nous avons également du ajouter un modèle Map. 

#### Note 
Une note possède un nom, une catégorie, une description, une latitude et une longitude. Backbone ajoute automatiquement un id lors de la création et la sauvegarde de la note.
 
#### Parcours
Un parcours, quant à lui, possède un nom, une catégorie, une description, une distance et une collection de notes. 

#### Map
Ce modèle permet de créer une variable globale qui stocke les données correspondant à la carte (google.maps.map, directionService, directionDisplay, position actuelle) et qui doivent être utilisées dans différentes parties. 

## Collections

Les collections ont logiquement pour modèles les notes et les parcours. Celles ci sont sauvegardées en local storage grâce à l'utilisation de la librairie backbone.localStorage. 

## Vues
Nous avons choisi de diviser les vues afin de rendre notre code plus lisible et plus facilement modifiable. 

#### NoteView
Cette vue correspond à l'affichage unique d'une note. Elle peut être appelée dans deux cas différents :

- pour l'affichage lorsque l'on clique sur un marqueur de la carte
- pour l'affiche des notes à sélectionner lors de la création ou la modification d'un parcours. 

C'est pour cela que le template est nul par défaut et qu'il existe une fonction pour le modifier. 

#### NotesView
Cette vue correspond à l'affichage d'une collection de notes. Cette vue est appelée pour afficher toutes les notes lors de la création ou la modification d'un parcours. 

#### TrackView
Comme son nom l'indique cette vue correspond à l'affichage d'un parcours. C'est elle qui va envoyer des événements pour indiquer si le parcours doit être affiché, modifié ou supprimé. Elle capte également des événements pour qu'elle soit rafraîchie si le modèle est modifié. 

#### TracksView
C'est la vue pour l'affichage de tous les parcours. 

#### AddNoteView
Cette vue permet d'afficher une fenêtre modale pour la création d'une nouvelle note. Elle gère les événements qui sont rattachés à la création du parcours : récupération de l'événement de création (click ou tap sur la carte), de la soumission du formulaire et envoi d'un événement pour la carte en lui indiquant qu'une note a été créée. 

#### AddTrackView
De même que pour AddNoteView, cette vue affiche une fenêtre modale pour la création d'un parcours.

À noter que cette vue doit récupérer toutes les notes pour les afficher afin que l'utilisateur choisisse quelles notes il veut ajouter dans son parcours. 

#### EditNoteView
Cette vue reprend le même principe que AddNoteView mais elle doit en plus récupérer la note correspondante. Pour cela, lors du click sur le bouton d'édition de la note, on envoie en paramètre l'id de la note, la fonction qui récupère cet événement va chercher la note dans la collection et la passe en paramètre du constructeur de la vue. 

#### EditTrackView
Cette vue est construite de la même manière que AddTrackView à part que le modèle correspondant est parsé pour récupérer les notes utilisées et celles ci sont cochées dans la vue des notes. 

#### MapView
C'est la vue qui gère l'affichage de la carte et les événements qui lui sont liés. Elle va donc afficher la carte, la position actuelle, les tracés des parcours et les marqueurs des différentes notes. 

#### ApplicationView / UserView
Ce sont les vues qui vont gérer les différentes vues, les faire communiquer et instancier les vues lorsque cela est nécessaire. ApplicationView est utilisé pour l'admin et UserView pour l'utilisateur final (il s'agit en fait d'un refactoring puisque nous ajoutons des fonctionnalités à l'admin que l'utilisateur n'a pas)

## Autres
Nous avons également du mettre quelques lignes de code afin de récupérer les données stockées en local et afin d'instancier la vue globale (index.html et user.html). 

Le fichier main.js définit trois variables globales qui permettent de simplifier la lecture du code, notamment pour le rendu d'une vue. 

## Commentaires
Des fichiers supplémentaires sont présents (gruntfile, package.json etc.) car l'application a été développée à l'aide de [Yeoman](http://yeoman.io) et écrite sur Sublime Text 2 (Geonotes.sublime-project . sublime-workspace). 

Nous avons choisi de garder les mêmes fichiers de script pour l'application que ce soit pour l'utilisateur final ou l'administrateur. Seul le fichier ApplicationView a été changé en UserView. Ce fichier n'instancie pas certains éléments et l'application de l'utilisateur est en quelque sorte l'application d'admin à laquelle on a retiré des fonctionnalités. Pour ce qui est du fichier HTML, nous avons utilisé un autre fichier (user.html au lieu de admin.html). Ainsi, on ne charge que ce qui est nécessaire à l'application utilisateur. 