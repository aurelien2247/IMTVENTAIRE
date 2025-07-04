drop table if exists article;
drop table if exists categorie;
drop table if exists etat;
drop table if exists piece;
drop table if exists etage;
drop table if exists batiment;


create table batiment (
	id SERIAL PRIMARY KEY,
    nom VARCHAR(100) NOT null
);

create table etage (
	id SERIAL PRIMARY KEY,
    nom VARCHAR(50) NOT NULL,
    id_batiment INTEGER NOT NULL,
    CONSTRAINT fk_batiment
        FOREIGN KEY (id_batiment)
        REFERENCES batiment(id)
        ON DELETE CASCADE
);

create table piece (
	id SERIAL PRIMARY KEY,
    nom VARCHAR(50) NOT NULL,
    id_etage INTEGER NOT NULL,
    CONSTRAINT fk_etage
        FOREIGN KEY (id_etage)
        REFERENCES etage(id)
        ON DELETE CASCADE
);

create table categorie (
	id SERIAL PRIMARY KEY,
    nom VARCHAR(100) NOT NULL
);

create table etat (
	id SERIAL PRIMARY KEY,
    nom VARCHAR(100) NOT NULL
);

create table article (
	num_inventaire VARCHAR(20) PRIMARY KEY,
    categorie INTEGER,
    etat INTEGER not null,
    id_piece INTEGER,
    num_serie VARCHAR(100),
    num_bon_commande VARCHAR(100),
    fournisseur VARCHAR(100),
    code_fournisseur BIGINT,
    marque VARCHAR(100),
    date_creation TIMESTAMP DEFAULT NOW(),
    date_modification TIMESTAMP DEFAULT NOW(),
    CONSTRAINT fk_piece
        FOREIGN KEY (id_piece)
        REFERENCES piece(id),
    CONSTRAINT fk_categorie
        FOREIGN KEY (categorie)
        REFERENCES categorie(id),
    CONSTRAINT fk_etat
        FOREIGN KEY (etat)
        REFERENCES etat(id)
);

-- Trigger pour mettre à jour automatiquement date_modification
CREATE OR REPLACE FUNCTION maj_date_modification_article()
RETURNS TRIGGER AS $$
BEGIN
    NEW.date_modification = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_maj_date_modif_article
BEFORE UPDATE ON article
FOR EACH ROW
EXECUTE FUNCTION maj_date_modification_article();