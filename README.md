# Organoids

Ce projet permet d’offrir une interface destinée aux chercheurs travaillant sur les organoïdes. Le but est de faciliter l'analyse des images, en superposant chaque image à son masque de segmentations.

## Installation : 

### Variables d'environnement 
Créez un fichier à l'interieur du dossier /server avec ces variables :  

DB_USERNAME= [à remplir]  
DB_PASSWORD= [à remplir]  
DB_HOST= [à remplir]  
DB_NAME= [à remplir]  
DB_PORT= [à remplir]  

Créez un fichier .env à l'interieur du dossier /client avec ces variables :  

REACT_APP_S3_URL=https://mouse-organoids.s3.eu-north-1.amazonaws.com  
REACT_APP_API_URL=http://localhost:8080   

### Base de données 
Le projet contient un fichier docker-compose.yml pour pouvoir lancer postgreSQL ainsi que pgAdmin sur des conteneurs : 
- A l'intérieur du fichier, complétez les variables avec celles du fichier server/.env .  
- Lancez la commande 'docker-compose up' pour créer démarrer les conteneurs.
La suite des explications se poursuit avec l'interface de pgAdmin, que l'on accéder sur localhost:8888  
- Créez un serveur avec les variables définies dans le docker-compose :
  
<img width="763" alt="Capture d’écran 2024-10-17 à 23 40 14" src="https://github.com/user-attachments/assets/4e441e2c-002a-4c0a-9ea4-49aa08750bf5">

- Créez la base de données avec le même nom défini pour DB_NAME

### Installation des dépendances du projet 

A la racine du projet, effectuez les commandes suivantes : 
- 'npm run install'
- 'npm run start'

### Remplissage des tables 

Le serveur s'est chargé de créer les tables dans la base de données. Pour les remplir, nous allons importer les données contenues dans des fichiers CSV. 
Ces fichiers se trouvent dans server/database.  
Étapes d'importation : 
- Faire un import depuis la table voulue :  
<img width="881" alt="Capture d’écran 2024-10-17 à 23 21 27" src="https://github.com/user-attachments/assets/ebc30fec-3d4e-4136-967a-e40917bb4701">

- Uploader un fichier :  
<img width="530" alt="Capture d’écran 2024-10-17 à 23 21 50" src="https://github.com/user-attachments/assets/23848000-6805-48f8-8473-6966473cfbfc">
- Valider 	
<img width="530" alt="Capture d’écran 2024-10-17 à 23 22 29" src="https://github.com/user-attachments/assets/d85e606e-fde9-4951-9440-50ab7e721064">

- Faire de même avec l'autre table.

## Lancement du projet 
Relancez l'application à l'aide de 'npm run start' et accéder au client sur localhost:3000. 

