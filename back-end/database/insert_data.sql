-- Insertion des bâtiments
INSERT INTO batiment (nom) VALUES ('A');
INSERT INTO batiment (nom) VALUES ('B');
INSERT INTO batiment (nom) VALUES ('C');
INSERT INTO batiment (nom) VALUES ('D');
INSERT INTO batiment (nom) VALUES ('P');
INSERT INTO batiment (nom) VALUES ('Admin');

-- Insertion des étages
INSERT INTO etage (nom, id_batiment) VALUES ('-1', 1);
INSERT INTO etage (nom, id_batiment) VALUES ('Rez-de-chaussée', 1);
INSERT INTO etage (nom, id_batiment) VALUES ('1', 1);
INSERT INTO etage (nom, id_batiment) VALUES ('2', 1);
INSERT INTO etage (nom, id_batiment) VALUES ('3', 1);
INSERT INTO etage (nom, id_batiment) VALUES ('-1', 2);
INSERT INTO etage (nom, id_batiment) VALUES ('Rez-de-chaussée', 2);
INSERT INTO etage (nom, id_batiment) VALUES ('1', 2);
INSERT INTO etage (nom, id_batiment) VALUES ('2', 2);
INSERT INTO etage (nom, id_batiment) VALUES ('3', 2);
INSERT INTO etage (nom, id_batiment) VALUES ('Rez-de-chaussée', 3);
INSERT INTO etage (nom, id_batiment) VALUES ('1', 3);
INSERT INTO etage (nom, id_batiment) VALUES ('2', 3);
INSERT INTO etage (nom, id_batiment) VALUES ('Rez-de-chaussée', 4);
INSERT INTO etage (nom, id_batiment) VALUES ('1', 4);
INSERT INTO etage (nom, id_batiment) VALUES ('2', 4);
INSERT INTO etage (nom, id_batiment) VALUES ('Rez-de-chaussée', 5);
INSERT INTO etage (nom, id_batiment) VALUES ('1', 5);
INSERT INTO etage (nom, id_batiment) VALUES ('2', 5);
INSERT INTO etage (nom, id_batiment) VALUES ('Rez-de-chaussée', 6);
INSERT INTO etage (nom, id_batiment) VALUES ('1', 6);
INSERT INTO etage (nom, id_batiment) VALUES ('2', 6);

-- Insertion des pièces
-- Bâtiment A
INSERT INTO piece (nom, id_etage) VALUES ('A-101', 1);
INSERT INTO piece (nom, id_etage) VALUES ('A-102', 1);
INSERT INTO piece (nom, id_etage) VALUES ('A-103', 1);
INSERT INTO piece (nom, id_etage) VALUES ('A000', 2);
INSERT INTO piece (nom, id_etage) VALUES ('A001', 2);
INSERT INTO piece (nom, id_etage) VALUES ('A002', 2);
INSERT INTO piece (nom, id_etage) VALUES ('A003', 2);
INSERT INTO piece (nom, id_etage) VALUES ('A100', 3);
INSERT INTO piece (nom, id_etage) VALUES ('A101', 3);
INSERT INTO piece (nom, id_etage) VALUES ('A102', 3);
INSERT INTO piece (nom, id_etage) VALUES ('A103', 3);
INSERT INTO piece (nom, id_etage) VALUES ('A200', 4);
INSERT INTO piece (nom, id_etage) VALUES ('A201', 4);
INSERT INTO piece (nom, id_etage) VALUES ('A202', 4);
INSERT INTO piece (nom, id_etage) VALUES ('A203', 4);
INSERT INTO piece (nom, id_etage) VALUES ('A300', 5);
INSERT INTO piece (nom, id_etage) VALUES ('A301', 5);
INSERT INTO piece (nom, id_etage) VALUES ('A302', 5);
INSERT INTO piece (nom, id_etage) VALUES ('A303', 5);

-- Bâtiment B
INSERT INTO piece (nom, id_etage) VALUES ('B-101', 6);
INSERT INTO piece (nom, id_etage) VALUES ('B-102', 6);
INSERT INTO piece (nom, id_etage) VALUES ('B-103', 6);
INSERT INTO piece (nom, id_etage) VALUES ('B000', 7);
INSERT INTO piece (nom, id_etage) VALUES ('B001', 7);
INSERT INTO piece (nom, id_etage) VALUES ('B002', 7);
INSERT INTO piece (nom, id_etage) VALUES ('B003', 7);
INSERT INTO piece (nom, id_etage) VALUES ('B100', 8);
INSERT INTO piece (nom, id_etage) VALUES ('B101', 8);
INSERT INTO piece (nom, id_etage) VALUES ('B102', 8);
INSERT INTO piece (nom, id_etage) VALUES ('B103', 8);
INSERT INTO piece (nom, id_etage) VALUES ('B200', 9);
INSERT INTO piece (nom, id_etage) VALUES ('B201', 9);
INSERT INTO piece (nom, id_etage) VALUES ('B202', 9);
INSERT INTO piece (nom, id_etage) VALUES ('B203', 9);
INSERT INTO piece (nom, id_etage) VALUES ('B300', 10);
INSERT INTO piece (nom, id_etage) VALUES ('B301', 10);
INSERT INTO piece (nom, id_etage) VALUES ('B302', 10);
INSERT INTO piece (nom, id_etage) VALUES ('B303', 10);

-- Bâtiment C
INSERT INTO piece (nom, id_etage) VALUES ('C000', 11);
INSERT INTO piece (nom, id_etage) VALUES ('C001', 11);
INSERT INTO piece (nom, id_etage) VALUES ('C002', 11);
INSERT INTO piece (nom, id_etage) VALUES ('C003', 11);
INSERT INTO piece (nom, id_etage) VALUES ('C100', 12);
INSERT INTO piece (nom, id_etage) VALUES ('C101', 12);
INSERT INTO piece (nom, id_etage) VALUES ('C102', 12);
INSERT INTO piece (nom, id_etage) VALUES ('C103', 12);
INSERT INTO piece (nom, id_etage) VALUES ('C200', 13);
INSERT INTO piece (nom, id_etage) VALUES ('C201', 13);
INSERT INTO piece (nom, id_etage) VALUES ('C202', 13);
INSERT INTO piece (nom, id_etage) VALUES ('C203', 13);

-- Bâtiment D
INSERT INTO piece (nom, id_etage) VALUES ('D000', 14);
INSERT INTO piece (nom, id_etage) VALUES ('D001', 14);
INSERT INTO piece (nom, id_etage) VALUES ('D002', 14);
INSERT INTO piece (nom, id_etage) VALUES ('D003', 14);
INSERT INTO piece (nom, id_etage) VALUES ('D100', 15);
INSERT INTO piece (nom, id_etage) VALUES ('D101', 15);
INSERT INTO piece (nom, id_etage) VALUES ('D102', 15);
INSERT INTO piece (nom, id_etage) VALUES ('D103', 15);
INSERT INTO piece (nom, id_etage) VALUES ('D200', 16);
INSERT INTO piece (nom, id_etage) VALUES ('D201', 16);
INSERT INTO piece (nom, id_etage) VALUES ('D202', 16);
INSERT INTO piece (nom, id_etage) VALUES ('D203', 16);

-- Bâtiment P
INSERT INTO piece (nom, id_etage) VALUES ('P000', 17);
INSERT INTO piece (nom, id_etage) VALUES ('P001', 17);
INSERT INTO piece (nom, id_etage) VALUES ('P002', 17);
INSERT INTO piece (nom, id_etage) VALUES ('P003', 17);
INSERT INTO piece (nom, id_etage) VALUES ('P100', 18);
INSERT INTO piece (nom, id_etage) VALUES ('P101', 18);
INSERT INTO piece (nom, id_etage) VALUES ('P102', 18);
INSERT INTO piece (nom, id_etage) VALUES ('P103', 18);
INSERT INTO piece (nom, id_etage) VALUES ('P200', 19);
INSERT INTO piece (nom, id_etage) VALUES ('P201', 19);
INSERT INTO piece (nom, id_etage) VALUES ('P202', 19);
INSERT INTO piece (nom, id_etage) VALUES ('P203', 19);

-- Bâtiment Admin
INSERT INTO piece (nom, id_etage) VALUES ('Admin000', 20);
INSERT INTO piece (nom, id_etage) VALUES ('Admin001', 20);
INSERT INTO piece (nom, id_etage) VALUES ('Admin002', 20);
INSERT INTO piece (nom, id_etage) VALUES ('Admin003', 20);
INSERT INTO piece (nom, id_etage) VALUES ('Admin100', 21);
INSERT INTO piece (nom, id_etage) VALUES ('Admin101', 21);
INSERT INTO piece (nom, id_etage) VALUES ('Admin102', 21);
INSERT INTO piece (nom, id_etage) VALUES ('Admin103', 21);
INSERT INTO piece (nom, id_etage) VALUES ('Admin200', 22);
INSERT INTO piece (nom, id_etage) VALUES ('Admin201', 22);
INSERT INTO piece (nom, id_etage) VALUES ('Admin202', 22);
INSERT INTO piece (nom, id_etage) VALUES ('Admin203', 22);

-- Insertion des catégories
INSERT INTO categorie (nom) VALUES ('Chaise');
INSERT INTO categorie (nom) VALUES ('Table');
INSERT INTO categorie (nom) VALUES ('PC portable');
INSERT INTO categorie (nom) VALUES ('Vidéo projecteur');
INSERT INTO categorie (nom) VALUES ('Écran');
INSERT INTO categorie (nom) VALUES ('Imprimante');
INSERT INTO categorie (nom) VALUES ('Tableau blanc');
INSERT INTO categorie (nom) VALUES ('Armoire');
INSERT INTO categorie (nom) VALUES ('Bureau');
INSERT INTO categorie (nom) VALUES ('Éclairage');

-- Insertion des états
INSERT INTO etat (nom) VALUES ('Neuf');
INSERT INTO etat (nom) VALUES ('Bon état');
INSERT INTO etat (nom) VALUES ('Mauvais état');
INSERT INTO etat (nom) VALUES ('En attente de destruction');
INSERT INTO etat (nom) VALUES ('Détruit');

-- Insertion des articles (exemples variés)
-- Chaises
INSERT INTO article (num_inventaire, categorie, etat, id_piece, num_serie, num_bon_commande, fournisseur, code_fournisseur, marque) VALUES ('29591', 1, 1, 1, 'CH2024A001', 'BC2024A001','Fournisseur 1', 1234, 'Marque 1');
INSERT INTO article (num_inventaire, categorie, etat, id_piece, num_serie, num_bon_commande, fournisseur, code_fournisseur, marque) VALUES ('29592', 1, 2, 2, 'CH2024A002', 'BC2024A002','Fournisseur 2', 5678, 'Marque 2');
INSERT INTO article (num_inventaire, categorie, etat, id_piece, num_serie, num_bon_commande, fournisseur, code_fournisseur, marque) VALUES ('29593', 1, 3, 3, 'CH2024A003', 'BC2024A003','Fournisseur 3', 9101, 'Marque 3');

-- Tables
INSERT INTO article (num_inventaire, categorie, etat, id_piece, num_serie, num_bon_commande, fournisseur, code_fournisseur, marque) VALUES ('29594', 2, 1, 4, 'TB2024A001', 'BC2024B001','Fournisseur 1', 1234, 'Marque 1');
INSERT INTO article (num_inventaire, categorie, etat, id_piece, num_serie, num_bon_commande, fournisseur, code_fournisseur, marque) VALUES ('29595', 2, 2, 5, 'TB2024A002', 'BC2024B002','Fournisseur 2', 5678, 'Marque 2');
INSERT INTO article (num_inventaire, categorie, etat, id_piece, num_serie, num_bon_commande, fournisseur, code_fournisseur, marque) VALUES ('29596', 2, 1, 6, 'TB2024A003', 'BC2024B003','Fournisseur 3', 9101, 'Marque 3');

-- PC portables
INSERT INTO article (num_inventaire, categorie, etat, id_piece, num_serie, num_bon_commande, fournisseur, code_fournisseur, marque) VALUES ('29597', 3, 1, 7, 'PC2024A001', 'BC2024C001','Fournisseur 1', 1234, 'Marque 1');
INSERT INTO article (num_inventaire, categorie, etat, id_piece, num_serie, num_bon_commande, fournisseur, code_fournisseur, marque) VALUES ('29598', 3, 2, 8, 'PC2024A002', 'BC2024C002','Fournisseur 2', 5678, 'Marque 2');
INSERT INTO article (num_inventaire, categorie, etat, id_piece, num_serie, num_bon_commande, fournisseur, code_fournisseur, marque) VALUES ('29599', 3, 3, 9, 'PC2024A003', 'BC2024C003','Fournisseur 3', 9101, 'Marque 3');

-- Vidéo projecteurs
INSERT INTO article (num_inventaire, categorie, etat, id_piece, num_serie, num_bon_commande, fournisseur, code_fournisseur, marque) VALUES ('29600', 4, 1, 10, 'VP2024A001', 'BC2024D001','Fournisseur 1', 1234, 'Marque 1');
INSERT INTO article (num_inventaire, categorie, etat, id_piece, num_serie, num_bon_commande, fournisseur, code_fournisseur, marque) VALUES ('29601', 4, 2, 11, 'VP2024A002', 'BC2024D002','Fournisseur 2', 5678, 'Marque 2');
INSERT INTO article (num_inventaire, categorie, etat, id_piece, num_serie, num_bon_commande, fournisseur, code_fournisseur, marque) VALUES ('29602', 4, 1, 12, 'VP2024A003', 'BC2024D003','Fournisseur 3', 9101, 'Marque 3');

-- Écrans
INSERT INTO article (num_inventaire, categorie, etat, id_piece, num_serie, num_bon_commande, fournisseur, code_fournisseur, marque) VALUES ('29603', 5, 1, 13, 'EC2024A001', 'BC2024E001','Fournisseur 1', 1234, 'Marque 1');
INSERT INTO article (num_inventaire, categorie, etat, id_piece, num_serie, num_bon_commande, fournisseur, code_fournisseur, marque) VALUES ('29604', 5, 2, 14, 'EC2024A002', 'BC2024E002','Fournisseur 2', 5678, 'Marque 2');
INSERT INTO article (num_inventaire, categorie, etat, id_piece, num_serie, num_bon_commande, fournisseur, code_fournisseur, marque) VALUES ('29605', 5, 1, 15, 'EC2024A003', 'BC2024E003','Fournisseur 3', 9101, 'Marque 3');

-- Imprimantes
INSERT INTO article (num_inventaire, categorie, etat, id_piece, num_serie, num_bon_commande, fournisseur, code_fournisseur, marque) VALUES ('29606', 6, 1, 16, 'IM2024A001', 'BC2024F001','Fournisseur 1', 1234, 'Marque 1');
INSERT INTO article (num_inventaire, categorie, etat, id_piece, num_serie, num_bon_commande, fournisseur, code_fournisseur, marque) VALUES ('29607', 6, 2, 17, 'IM2024A002', 'BC2024F002','Fournisseur 2', 5678, 'Marque 2');
INSERT INTO article (num_inventaire, categorie, etat, id_piece, num_serie, num_bon_commande, fournisseur, code_fournisseur, marque) VALUES ('29608', 6, 3, 18, 'IM2024A003', 'BC2024F003','Fournisseur 3', 9101, 'Marque 3');

-- Tableaux blancs
INSERT INTO article (num_inventaire, categorie, etat, id_piece, num_serie, num_bon_commande, fournisseur, code_fournisseur, marque) VALUES ('29609', 7, 1, 19, 'TB2024A001', 'BC2024G001','Fournisseur 1', 1234, 'Marque 1');
INSERT INTO article (num_inventaire, categorie, etat, id_piece, num_serie, num_bon_commande, fournisseur, code_fournisseur, marque) VALUES ('29610', 7, 2, 20, 'TB2024A002', 'BC2024G002','Fournisseur 2', 5678, 'Marque 2');
INSERT INTO article (num_inventaire, categorie, etat, id_piece, num_serie, num_bon_commande, fournisseur, code_fournisseur, marque) VALUES ('29611', 7, 1, 21, 'TB2024A003', 'BC2024G003','Fournisseur 3', 9101, 'Marque 3');

-- Armoires
INSERT INTO article (num_inventaire, categorie, etat, id_piece, num_serie, num_bon_commande, fournisseur, code_fournisseur, marque) VALUES ('29612', 8, 1, 22, 'AR2024A001', 'BC2024H001','Fournisseur 1', 1234, 'Marque 1');
INSERT INTO article (num_inventaire, categorie, etat, id_piece, num_serie, num_bon_commande, fournisseur, code_fournisseur, marque) VALUES ('29613', 8, 2, 23, 'AR2024A002', 'BC2024H002','Fournisseur 2', 5678, 'Marque 2');
INSERT INTO article (num_inventaire, categorie, etat, id_piece, num_serie, num_bon_commande, fournisseur, code_fournisseur, marque) VALUES ('29614', 8, 1, 24, 'AR2024A003', 'BC2024H003','Fournisseur 3', 9101, 'Marque 3');

-- Bureaux
INSERT INTO article (num_inventaire, categorie, etat, id_piece, num_serie, num_bon_commande, fournisseur, code_fournisseur, marque) VALUES ('29615', 9, 1, 25, 'BU2024A001', 'BC2024I001','Fournisseur 1', 1234, 'Marque 1');
INSERT INTO article (num_inventaire, categorie, etat, id_piece, num_serie, num_bon_commande, fournisseur, code_fournisseur, marque) VALUES ('29616', 9, 2, 26, 'BU2024A002', 'BC2024I002','Fournisseur 2', 5678, 'Marque 2');
INSERT INTO article (num_inventaire, categorie, etat, id_piece, num_serie, num_bon_commande, fournisseur, code_fournisseur, marque) VALUES ('29617', 9, 1, 27, 'BU2024A003', 'BC2024I003','Fournisseur 3', 9101, 'Marque 3');

-- Éclairages
INSERT INTO article (num_inventaire, categorie, etat, id_piece, num_serie, num_bon_commande, fournisseur, code_fournisseur, marque) VALUES ('29618', 10, 1, 28, 'EL2024A001', 'BC2024J001','Fournisseur 1', 1234, 'Marque 1');
INSERT INTO article (num_inventaire, categorie, etat, id_piece, num_serie, num_bon_commande, fournisseur, code_fournisseur, marque) VALUES ('29619', 10, 2, 29, 'EL2024A002', 'BC2024J002','Fournisseur 2', 5678, 'Marque 2');
INSERT INTO article (num_inventaire, categorie, etat, id_piece, num_serie, num_bon_commande, fournisseur, code_fournisseur, marque) VALUES ('29620', 10, 1, 30, 'EL2024A003', 'BC2024J003','Fournisseur 3', 9101, 'Marque 3');
