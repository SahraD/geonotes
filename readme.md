# Application Géonotes

Ce repo contient les fichiers du groupe Matthis Duclos/Alexandre Laurent pour le projet d'IHM

Seconde version de géonotes codée en utilisant [Yeoman](http://yeoman.io)


## TO-DO List

### Partie Admin

**Ajout de notes**

*Manque le passage du passage des coordonnées cliquées en paramètre. Nécessite ensuite une sauvegarde en local puis envoi au serveur*


**Modification de notes**

*Click sur une note. Deux boutons : supprimer et modifier. Lorsque modifier, faire apparaître fenêtre modale avec les données et c'est bon. Donc ajout de fonctionnalités à la vue addNewNote*


**Ajout de parcours à partir des notes**

*Même principe que pour l'ajout de notes mais click depuis un bouton. Faire une liste des notes avec un SELECT (pas très user-friendly mais bon ...)*


**Modification des parcours**

*Même principe que pour modification de notes sauf que autre fenêtre (addNewTrack). Et basé sur un bouton*


**Suppressions**

### Partie utilisateur

**Recherche de note ou de parcours (lequel des 2 ?)**

*Faire une sorte de preg_match parmi toutes les données ...Ou trouver une librairie de recherche dans du JSON*

**Lancer un parcours depuis une note choisie**

*Ajouter un bouton pour lancer parcours. Problème si plusieurs parcours par note ...*


### Général

- LocalStorage
- Calcul de distance et de dénivelé
- REST
- Serveur EJB