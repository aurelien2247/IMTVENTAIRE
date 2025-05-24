DROP TABLE IF EXISTS article;
DROP TABLE IF EXISTS categorie;
DROP TABLE IF EXISTS piece;
DROP TABLE IF EXISTS etage;
DROP TABLE IF EXISTS batiment;

CREATE TABLE batiment (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(100) NOT NULL
);

CREATE TABLE etage (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(50) NOT NULL,
    id_batiment INTEGER NOT NULL,
    CONSTRAINT fk_batiment
        FOREIGN KEY (id_batiment)
        REFERENCES batiment(id)
        ON DELETE CASCADE
);

CREATE TABLE piece (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(50) NOT NULL,
    id_etage INTEGER NOT NULL,
    CONSTRAINT fk_etage
        FOREIGN KEY (id_etage)
        REFERENCES etage(id)
        ON DELETE CASCADE
);

CREATE TABLE categorie (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(100) NOT NULL
);

CREATE TABLE article (
    num_inventaire INT PRIMARY KEY,
    categorie INTEGER,
    id_piece INTEGER,
    num_serie VARCHAR(100),
    num_bon_commande VARCHAR(100),
    CONSTRAINT fk_piece
        FOREIGN KEY (id_piece)
        REFERENCES piece(id),
    CONSTRAINT fk_categorie
        FOREIGN KEY (categorie)
        REFERENCES categorie(id)
);