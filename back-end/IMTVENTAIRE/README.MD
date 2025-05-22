
# IMTVENTAIRE

IMTVENTAIRE est une application de gestion d'inventaire développée avec AdonisJS et PostgreSQL.

## Dépendances à installer

### Prérequis
- Node.js (v14 ou supérieur)
- npm (v6 ou supérieur)
- PostgreSQL (v12 ou supérieur)

### Dépendances principales
- @adonisjs/core: ^5.9.0
- @adonisjs/lucid: ^18.4.0
- @adonisjs/repl: ^3.1.11
- pg: ^8.11.3
- proxy-addr: ^2.0.7
- reflect-metadata: ^0.2.2
- source-map-support: ^0.5.21

## Installation

1. Cloner le dépôt
```bash
git clone <url-du-depot>
cd IMTVENTAIRE
```

2. Installer les dépendances
```bash
npm install
```

3. Configurer l'environnement
   - Copier le fichier `.env.example` vers `.env` (s'il existe)
   - Configurer les variables d'environnement, notamment pour la base de données PostgreSQL:
```
DB_CONNECTION=pg
PG_HOST=localhost
PG_PORT=5432
PG_USER=postgres
PG_PASSWORD=admin
PG_DB_NAME=postgres
```

4. Exécuter les migrations (si nécessaire)
```bash
node ace migration:run
```

## Lancement du projet

### Mode développement
```bash
npm run dev
```
L'application sera accessible à l'adresse: http://localhost:3333

### Mode production
```bash
npm run build
npm start
```

## Diagrame de la base de donnée

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
