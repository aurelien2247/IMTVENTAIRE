<h1 align="center">
    <br>
        <img src="/front-end/public/logo-512.png" alt="Logo" width="200">
    <br>
    IMT'ventaire
</h1>

<h4 align="center">Back-end de l'application de gestion d'inventaire</h4>

<p align="center">
  <a href="#🛠️-participer-au-développement">Participer</a> •
  <a href="#🕹️-technologies">Technologies</a>
</p>

## 🛠️ Participer au développement

### Code

Depuis votre terminal:

```bash
# Se déplacer dans le dossier
$ cd back-end

# Installer les dépendances
$ npm install

# Lancer les conteneurs
$ docker-compose up --build
```

L'application sera accessible à l'adresse http://localhost:3333 et la base de données PostgreSQL à l'adresse http://localhost:5432.

C'est prêt ! 🚀

## 🕹️ Technologies

<img src="https://skillicons.dev/icons?i=adonis,postgres,docker" alt="Les technologies utilisées" />


## 🤖 Diagrame de la base de donnée

```
+---------------+       +---------------+       +---------------+
|   batiment    |       |     etage     |       |     piece     |
+---------------+       +---------------+       +---------------+
| id (AI)       |       | id (AI)       |       | id (AI)       |
| nom           |<------| nom           |<------| nom           |
+---------------+       | id_batiment   |       | id_etage      |
                        +---------------+       +---------------+
                                                       ^
                                                       |
                                                       |
                                                       |
                        +---------------+              |
                        |    article    |              |
                        +---------------+              |
                        | num_inventaire|              |
                        | categorie     |--------------+
                        | id_piece      |
                        | num_serie     |
                        | num_bon_commande |
                        +---------------+
                               |
                               |
                               v
                        +---------------+
                        |   categorie   |
                        +---------------+
                        | id (AI)       |
                        | nom           |
                        +---------------+
