# 📚 Projet DevOps : API de bibliothèque numérique (sans base de données)

## 🎯 Objectif

Développer une API REST en Node.js + Express pour gérer une bibliothèque numérique avec des données stockées en mémoire (fichiers JSON ou tableaux JS), et mettre en place un pipeline CI/CD sur Azure DevOps.

## 🔗 Liens utiles

📁 Repository Azure DevOps: [https://dev.azure.com/loicdedeyn/\_git/projet-devops](https://dev.azure.com/loicdedeyn/_git/projet-devops)

🚀 Déploiement Azure Web App : <https://projet-devops-bbhug2f8dzbyckam.norwayeast-01.azurewebsites.net/>

## 🚧 État d'avancement

| Fonctionnalité       | État    | Commentaire éventuel                                                                                                    |
| -------------------- | ------- | ----------------------------------------------------------------------------------------------------------------------- |
| API Livres           | Terminé |                                                                                                                         |
| API Utilisateurs     | Terminé |                                                                                                                         |
| API Emprunts         | Terminé |                                                                                                                         |
| API Export CSV       | Terminé | Les fichiers sont exportés dans le même dossier que le projet                                                           |
| Tests unitaires      | Terminé |                                                                                                                         |
| Tests d'intégration  | Terminé |                                                                                                                         |
| Pipeline CI/CD       | Terminé | Nous avons protégé la branche main. On ne peut pas push sur la main directement : obligation de faire une Pull Request. |
| Documentation README | Terminé |                                                                                                                         |

## 📄 Instructions de déploiement

1. Cloner le repo:

**git clone https://loicdedeyn@dev.azure.com/loicdedeyn/projet-devops/\_git/projet-devops**

2. Installer les dépendances : **npm install**

3. Lancer les tests : **npm run test**

4. Déploiement automatique :
    1. Lancer l'agent Azure sur un pc local
    2. Faire une Pull Request
    3. Après fusion sur la branche main, la pipeline se lance automatiquement
    4. Lance le script **npm run prettier:check** et le script **npm run lint** avec une condition de succès obligatoire pour les deux
    5. Lance les tests
    6. Déploiement de l'application sur Azure Web App

## 👥 Répartition des rôles

| Nom                    | Rôle                                                                                                                                                    |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Étudiant A: Amine      | API Livres (méthodes getById, PUT et DELETE) + Ajouter script ES LINT dans le fichier .yaml + guard isBook + tests book                                 |
| Étudiant B: Berkan     | API Utilisateurs + guard isUser + tests user                                                                                                            |
| Étudiant C: Loïc       | Setup initial du projet Azure + API Livres (méthodes getAll et POST) + API CSV + Ajouter script prettier dans le fichier .yaml + tests book + tests csv |
| Étudiant D: Jalal      | Setup app service + API Emprunts + guard isString, isNumber + tests borrow                                                                              |
| Tâches faite en groupe | CI/CD + App service + Azure Boards + debugging en groupe (tous ensemble)                                                                                |

## Conclusion

**Jalal :**

Personnellement, j'ai trouvé que dans les slides, les tests n'étaient pas assez détaillés, ce qui a rendu cette partie un peu floue. De plus, l'annonce de l'authentification trois jours avant la fin du projet a été un peu tardive.  
Globalement, j'ai trouvé le cours complet et bien structuré. Mon groupe a bien travaillé, et tout le monde était réactif, ce qui a rendu le projet agréable à réaliser. J'ai particulièrement apprécié la partie sur Azure, qui est très bien expliquée dans le cours, c'est une plateforme vraiment intéressante et pratique à utiliser.

**Berkan:**

Le projet s'est globalement bien passé, on s'est bien réparti les tâches et j'ai eu l'impression qu'on bossait vraiment pour une entreprise. Nous avons fait des réunions régulières et parler des modifications que nous avons apporté à notre code. Dans l'ensemble très chouette projet.

**Amine:**

L'annonce de l'authentification en fin de projet était tardive et je trouve qu'il y avait un manque de ressources par rapport aux tests unitaires **mais** grâce à ce manque, j'ai pu faire mes propres recherches dans la documentation ce qui m'a permis de mieux comprendre.  
L'atmosphère de groupe était agréable. Nous avons bien réparti les tâches grâce au Boards d'Azure et avons fait des réunions régulièrement pour pouvoir débugger avec les personnes en difficulté et pour pouvoir faire un point sur l'avancement du projet. Je me suis vite adapté à l'environnement Azure et je trouve que c'est un super outil pour le travail de groupe.

**Loïc :**

J'ai beaucoup apprécié ce projet car il m'a appris à travailler en groupe et à distance de façon synchrone et asynchrone. Nous avons rencontré des problèmes liés au code et parfois liés à la communication mais nous avons toujours su régler tous les problèmes, en restant une équipe soudée. J'ai également apprécié les concepts de CI/CD, de travailler avec la pipeline, faire des tests, faire du débogage, travailler avec Git et j'ai aimé l'organisation interne de notre groupe. J'aurais aussi voulu implémenter Export CSV d'une autre manière pour laisser la possibilité à l'utilisateur de télécharger les fichiers CSV directement sur son ordinateur, cependant par souci de temps et comme ce n'était pas indiqué dans les consignes, j'ai préféré faire une implémentation plus classique. J'aurais également apprécié avoir vu plus de concepts liés à la sécurité et que ce soit mentionné dans les consignes au préalable.  
Pour conclure, ce fut un projet très amusant, tant du point de vue programmation que du point de vue humain.
