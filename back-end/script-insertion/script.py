import pandas as pd
import re
import logging
from datetime import datetime
import os

# Configuration de logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

class SQLGenerator:
    def __init__(self):
        """Initialise le générateur SQL"""
        self.batiments = {}  # nom -> id (auto-increment simulé)
        self.etages = {}     # (nom, id_batiment) -> id
        self.pieces = {}     # (nom, id_etage) -> id
        self.categories = {} # nom -> id
        self.etats = {}      # nom -> id
        
        # Compteurs pour les IDs auto-increment
        self.next_batiment_id = 1
        self.next_etage_id = 1
        self.next_piece_id = 1
        self.next_categorie_id = 1
        self.next_etat_id = 1
        
        # Stockage des requêtes SQL
        self.sql_statements = []
        
        # Compteurs de filtrage
        self.filtered_no_inventory = 0
        self.filtered_invalid_room = 0
        self.filtered_brest = 0
        self.filtered_excluded_buildings = 0
        
    def is_valid_room_code(self, piece_code):
        """
        Vérifie si le code pièce est valide
        - Doit commencer par une lettre
        - Ne doit pas être "BREST"
        - Ne doit pas commencer par "IA", "VL", ou "IB"
        """
        if not piece_code or piece_code.strip() == '' or piece_code == '~~':
            return False
            
        piece_code = piece_code.strip().upper()
        
        # Vérifier si c'est "BREST"
        if piece_code == 'BREST':
            return False
            
        # Vérifier si ça commence par une lettre
        if not re.match(r'^[A-Z]', piece_code):
            return False
            
        # Vérifier si ça commence par les bâtiments exclus
        excluded_buildings = ['IA', 'VL', 'IB']
        for excluded in excluded_buildings:
            if piece_code.startswith(excluded):
                return False
            
        return True
        
    def parse_piece_code(self, piece_code):
        """
        Parse le code pièce pour extraire bâtiment, étage, et numéro de pièce
        
        Exemples selon votre structure:
        - B203 → bâtiment: B, étage: 2, nom_piece: B203
        - H103 → bâtiment: H, étage: 1, nom_piece: H103
        - A000 → bâtiment: A, étage: Rez-de-chaussée, nom_piece: A000
        """
        if not self.is_valid_room_code(piece_code):
            return None, None, None
            
        piece_code = piece_code.strip().upper()
        
        # Pattern pour capturer: lettre(s) + chiffres
        match = re.match(r'^([A-Z]+)(\d+)$', piece_code)
        if not match:
            logger.warning(f"Format de pièce non reconnu: {piece_code}")
            return None, None, None
        
        batiment_nom = match.group(1)
        numero_complet = match.group(2)
        
        # Déterminer l'étage selon le premier chiffre/les premiers chiffres
        if len(numero_complet) >= 3:
            premier_chiffre = int(numero_complet[0])
            if premier_chiffre == 0:
                # Rez-de-chaussée (ex: A000, B001)
                etage_nom = "Rez-de-chaussée"
            elif premier_chiffre == 1:
                # Étage 1 (ex: A101, B103)
                etage_nom = "1"
            elif premier_chiffre == 2:
                # Étage 2 (ex: A201, B203)
                etage_nom = "2"
            elif premier_chiffre == 3:
                # Étage 3 (ex: A301, B303)
                etage_nom = "3"
            else:
                # Gérer les étages élevés
                etage_nom = str(premier_chiffre)
        else:
            logger.warning(f"Numéro de pièce trop court: {piece_code}")
            return None, None, None
        
        # Le nom de la pièce est le code complet
        nom_piece = piece_code
        
        return batiment_nom, etage_nom, nom_piece
    
    def escape_sql_string(self, value):
        """Échappe les chaînes pour SQL"""
        if value is None:
            return 'NULL'
        escaped_value = str(value).replace("'", "''")
        return f"'{escaped_value}'"
    
    def get_or_create_batiment(self, nom_batiment):
        """Récupère l'ID du bâtiment ou le crée s'il n'existe pas"""
        if not nom_batiment:
            return None
            
        if nom_batiment in self.batiments:
            return self.batiments[nom_batiment]
        
        # Créer le bâtiment
        batiment_id = self.next_batiment_id
        self.batiments[nom_batiment] = batiment_id
        self.next_batiment_id += 1
        
        # Utiliser INSERT sans ID explicite pour l'auto-increment
        sql = f"INSERT INTO batiment (nom) VALUES ({self.escape_sql_string(nom_batiment)});"
        self.sql_statements.append(sql)
        logger.info(f"Bâtiment ajouté: {nom_batiment} (ID: {batiment_id})")
        
        return batiment_id
    
    def get_or_create_etage(self, nom_etage, id_batiment):
        """Récupère l'ID de l'étage ou le crée s'il n'existe pas"""
        if not nom_etage or not id_batiment:
            return None
            
        key = (str(nom_etage), id_batiment)
        if key in self.etages:
            return self.etages[key]
        
        # Créer l'étage
        etage_id = self.next_etage_id
        self.etages[key] = etage_id
        self.next_etage_id += 1
        
        # Utiliser INSERT sans ID explicite pour l'auto-increment
        sql = f"INSERT INTO etage (nom, id_batiment) VALUES ({self.escape_sql_string(str(nom_etage))}, {id_batiment});"
        self.sql_statements.append(sql)
        logger.info(f"Étage ajouté: {nom_etage} dans bâtiment ID {id_batiment} (ID: {etage_id})")
        
        return etage_id
    
    def get_or_create_piece(self, nom_piece, id_etage):
        """Récupère l'ID de la pièce ou la crée si elle n'existe pas"""
        if not nom_piece or not id_etage:
            return None
            
        key = (str(nom_piece), id_etage)
        if key in self.pieces:
            return self.pieces[key]
        
        # Créer la pièce
        piece_id = self.next_piece_id
        self.pieces[key] = piece_id
        self.next_piece_id += 1
        
        # Utiliser INSERT sans ID explicite pour l'auto-increment
        sql = f"INSERT INTO piece (nom, id_etage) VALUES ({self.escape_sql_string(str(nom_piece))}, {id_etage});"
        self.sql_statements.append(sql)
        logger.info(f"Pièce ajoutée: {nom_piece} dans étage ID {id_etage} (ID: {piece_id})")
        
        return piece_id
    
    def get_or_create_categorie(self, nom_categorie):
        """Récupère l'ID de la catégorie ou la crée si elle n'existe pas"""
        if not nom_categorie or nom_categorie.strip() == '':
            return None
            
        nom_categorie = nom_categorie.strip()
        
        if nom_categorie in self.categories:
            return self.categories[nom_categorie]
        
        # Créer la catégorie
        categorie_id = self.next_categorie_id
        self.categories[nom_categorie] = categorie_id
        self.next_categorie_id += 1
        
        # Utiliser INSERT sans ID explicite pour l'auto-increment
        sql = f"INSERT INTO categorie (nom) VALUES ({self.escape_sql_string(nom_categorie)});"
        self.sql_statements.append(sql)
        logger.info(f"Catégorie ajoutée: {nom_categorie} (ID: {categorie_id})")
        
        return categorie_id
    
    def get_or_create_etat(self, nom_etat):
        """Récupère l'ID de l'état ou le crée s'il n'existe pas"""
        if not nom_etat or nom_etat.strip() == '':
            # État par défaut si non spécifié
            nom_etat = "Bon état"
            
        nom_etat = nom_etat.strip()
        
        if nom_etat in self.etats:
            return self.etats[nom_etat]
        
        # Créer l'état
        etat_id = self.next_etat_id
        self.etats[nom_etat] = etat_id
        self.next_etat_id += 1
        
        # Utiliser INSERT sans ID explicite pour l'auto-increment
        sql = f"INSERT INTO etat (nom) VALUES ({self.escape_sql_string(nom_etat)});"
        self.sql_statements.append(sql)
        logger.info(f"État ajouté: {nom_etat} (ID: {etat_id})")
        
        return etat_id
    
    def clean_value(self, value):
        """Nettoie les valeurs vides ou '~~'"""
        if pd.isna(value) or str(value).strip() in ['', '~~', 'nan']:
            return None
        return str(value).strip()
    
    def should_process_row(self, row):
        """
        Vérifie si une ligne doit être traitée selon nos critères de filtrage
        Retourne (should_process, reason_if_not)
        """
        # Vérifier le numéro d'inventaire
        num_inventaire = self.clean_value(row.get('num_inventaire'))
        if not num_inventaire:
            return False, "no_inventory"
        
        # Vérifier le code pièce
        piece_code = self.clean_value(row.get('piece_code'))
        if piece_code:
            piece_code_upper = piece_code.upper()
            
            # Vérifier si c'est "BREST"
            if piece_code_upper == 'BREST':
                return False, "brest"
            
            # Vérifier si ça commence par une lettre
            if not re.match(r'^[A-Z]', piece_code_upper):
                return False, "invalid_room"
                
            # Vérifier si ça commence par les bâtiments exclus
            excluded_buildings = ['IA', 'VL', 'IB']
            for excluded in excluded_buildings:
                if piece_code_upper.startswith(excluded):
                    return False, "excluded_buildings"
        
        return True, None
    
    def generate_sql_from_excel(self, excel_file_path, output_sql_path):
        """Génère le fichier SQL depuis le fichier Excel/ODS"""
        try:
            # Lire le fichier (supporte Excel et ODS)
            if excel_file_path.endswith('.ods'):
                df = pd.read_excel(excel_file_path, engine='odf')
            else:
                df = pd.read_excel(excel_file_path)
            
            logger.info(f"Fichier lu avec succès. {len(df)} lignes trouvées")
            
            # Afficher les colonnes pour debug
            logger.info("Colonnes détectées dans le fichier:")
            for i, col in enumerate(df.columns):
                logger.info(f"  Colonne {i}: '{col}'")
            
            # Mapping des colonnes par position (plus fiable que par nom)
            if len(df.columns) >= 15:
                df.columns = [
                    'num_inventaire',      # 0: N° d'inventaire  
                    'num_article',         # 1: N° d'article
                    'article_type',        # 2: Article (catégorie)
                    'date_inventaire',     # 3: Date d'inventaire
                    'cree_le',            # 4: Créé le
                    'piece_code',         # 5: N° pièce
                    'propriete_de',       # 6: Propriété de
                    'num_serie',          # 7: N° de série
                    'num_bon_commande',   # 8: N° de commande
                    'fournisseur',        # 9: Fournisseur
                    'type_equipement',    # 11: Type
                    'equipement',         # 12: Equipement
                    'modele',             # 13: Modèle
                    'marque',             # 14: Marque
                ] + [f'col_{i}' for i in range(15, len(df.columns))]
            else:
                logger.error(f"Nombre de colonnes insuffisant: {len(df.columns)}. Attendu: au moins 15")
                return 0, 1
            
            # Commencer le fichier SQL
            self.sql_statements.append("-- Script SQL généré automatiquement")
            self.sql_statements.append(f"-- Date de génération: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
            self.sql_statements.append(f"-- Source: {excel_file_path}")
            self.sql_statements.append("-- Filtres appliqués:")
            self.sql_statements.append("--   - Lignes sans numéro d'inventaire exclues")
            self.sql_statements.append("--   - Codes pièce ne commençant pas par une lettre exclus")
            self.sql_statements.append("--   - Codes pièce 'BREST' exclus")
            self.sql_statements.append("--   - Bâtiments 'IA', 'VL', 'IB' exclus")
            self.sql_statements.append("")
            
            # Séparation des sections
            self.sql_statements.append("-- Insertion des bâtiments")
            
            success_count = 0
            error_count = 0
            
            # Première passe : filtrer et créer toutes les structures valides
            valid_rows = []
            for index, row in df.iterrows():
                should_process, reason = self.should_process_row(row)
                
                if not should_process:
                    if reason == "no_inventory":
                        self.filtered_no_inventory += 1
                        logger.debug(f"Ligne {index+1} filtrée: pas de numéro d'inventaire")
                    elif reason == "brest":
                        self.filtered_brest += 1
                        logger.debug(f"Ligne {index+1} filtrée: code pièce 'BREST'")
                    elif reason == "invalid_room":
                        self.filtered_invalid_room += 1
                        piece_code = self.clean_value(row.get('piece_code'))
                        logger.debug(f"Ligne {index+1} filtrée: code pièce invalid '{piece_code}'")
                    elif reason == "excluded_buildings":
                        self.filtered_excluded_buildings += 1
                        piece_code = self.clean_value(row.get('piece_code'))
                        logger.debug(f"Ligne {index+1} filtrée: bâtiment exclu '{piece_code}'")
                    continue
                
                valid_rows.append((index, row))
                
                try:
                    piece_code = self.clean_value(row.get('piece_code'))
                    if piece_code and self.is_valid_room_code(piece_code):
                        batiment_nom, etage_nom, nom_piece = self.parse_piece_code(piece_code)
                        if batiment_nom and etage_nom and nom_piece:
                            id_batiment = self.get_or_create_batiment(batiment_nom)
                            if id_batiment:
                                id_etage = self.get_or_create_etage(etage_nom, id_batiment)
                                if id_etage:
                                    self.get_or_create_piece(nom_piece, id_etage)
                    
                    # Créer les catégories
                    article_type = self.clean_value(row.get('article_type'))
                    if article_type:
                        self.get_or_create_categorie(article_type)
                    
                except Exception as e:
                    logger.error(f"Erreur lors de la création des structures ligne {index+1}: {e}")
                    continue
            
            logger.info(f"Lignes filtrées: {len(df) - len(valid_rows)} sur {len(df)} total")
            logger.info(f"  - Sans numéro d'inventaire: {self.filtered_no_inventory}")
            logger.info(f"  - Code pièce invalide: {self.filtered_invalid_room}")
            logger.info(f"  - Code pièce 'BREST': {self.filtered_brest}")
            logger.info(f"  - Bâtiments exclus (IA/VL/IB): {self.filtered_excluded_buildings}")
            logger.info(f"Lignes valides à traiter: {len(valid_rows)}")
            
            # Créer l'état par défaut
            self.get_or_create_etat("Bon état")
            
            # Ajouter les sections
            self.sql_statements.append("")
            self.sql_statements.append("-- Insertion des étages")
            self.sql_statements.append("")
            self.sql_statements.append("-- Insertion des pièces")
            self.sql_statements.append("")
            self.sql_statements.append("-- Insertion des catégories")
            self.sql_statements.append("")
            self.sql_statements.append("-- Insertion des états")
            self.sql_statements.append("")
            self.sql_statements.append("-- Insertion des articles")
            
            # Deuxième passe : insérer les articles valides
            for index, row in valid_rows:
                try:
                    # Nettoyer les données
                    num_inventaire = self.clean_value(row.get('num_inventaire'))
                    piece_code = self.clean_value(row.get('piece_code'))
                    
                    # Parser le code pièce
                    batiment_nom, etage_nom, nom_piece = self.parse_piece_code(piece_code)
                    
                    # Récupérer l'ID de la pièce
                    id_piece = None
                    if batiment_nom and etage_nom and nom_piece:
                        id_batiment = self.batiments.get(batiment_nom)
                        if id_batiment:
                            id_etage = self.etages.get((etage_nom, id_batiment))
                            if id_etage:
                                id_piece = self.pieces.get((nom_piece, id_etage))
                    
                    # Récupérer l'ID de la catégorie
                    article_type = self.clean_value(row.get('article_type'))
                    id_categorie = self.categories.get(article_type) if article_type else None
                    
                    # Récupérer l'ID de l'état
                    id_etat = self.etats.get("Bon état")
                    
                    # Préparer les autres données
                    num_serie = self.clean_value(row.get('num_serie'))
                    num_bon_commande = self.clean_value(row.get('num_bon_commande'))
                    fournisseur = self.clean_value(row.get('fournisseur'))
                    marque = self.clean_value(row.get('marque'))
                    
                    # Générer l'INSERT pour l'article
                    article_sql = f"""INSERT INTO article (num_inventaire, categorie, etat, id_piece, num_serie, num_bon_commande, fournisseur, marque) VALUES ({self.escape_sql_string(num_inventaire)}, {id_categorie or 'NULL'}, {id_etat}, {id_piece or 'NULL'}, {self.escape_sql_string(num_serie)}, {self.escape_sql_string(num_bon_commande)}, {self.escape_sql_string(fournisseur)}, {self.escape_sql_string(marque)});"""
                    
                    self.sql_statements.append(article_sql)
                    success_count += 1
                    
                    if success_count % 100 == 0:
                        logger.info(f"Traité {success_count} articles...")
                
                except Exception as e:
                    logger.error(f"Erreur ligne {index+1}: {e}")
                    error_count += 1
                    continue
            
            # Finaliser le fichier SQL
            self.sql_statements.append("")
            self.sql_statements.append(f"-- Résumé: {success_count} articles traités, {error_count} erreurs")
            self.sql_statements.append(f"-- Lignes filtrées: {self.filtered_no_inventory + self.filtered_invalid_room + self.filtered_brest + self.filtered_excluded_buildings}")
            
            # Écrire le fichier SQL
            with open(output_sql_path, 'w', encoding='utf-8') as f:
                f.write('\n'.join(self.sql_statements))
            
            logger.info(f"Fichier SQL généré: {output_sql_path}")
            logger.info(f"Import terminé. Succès: {success_count}, Erreurs: {error_count}")
            
            return success_count, error_count
            
        except Exception as e:
            logger.error(f"Erreur lors de la génération: {e}")
            raise
    
    def print_summary(self):
        """Affiche un résumé des éléments créés"""
        print("\n=== RÉSUMÉ DES ÉLÉMENTS CRÉÉS ===")
        print(f"Bâtiments: {len(self.batiments)}")
        for nom, id_bat in self.batiments.items():
            print(f"  - {nom} (ID: {id_bat})")
        
        print(f"\nÉtages: {len(self.etages)}")
        for (nom, id_bat), id_etage in self.etages.items():
            print(f"  - Étage {nom} dans bâtiment ID {id_bat} (ID: {id_etage})")
        
        print(f"\nPièces: {len(self.pieces)}")
        for (nom, id_etage), id_piece in self.pieces.items():
            print(f"  - Pièce {nom} dans étage ID {id_etage} (ID: {id_piece})")
        
        print(f"\nCatégories: {len(self.categories)}")
        for nom, id_cat in self.categories.items():
            print(f"  - {nom} (ID: {id_cat})")
        
        print(f"\nÉtats: {len(self.etats)}")
        for nom, id_etat in self.etats.items():
            print(f"  - {nom} (ID: {id_etat})")
            
        print(f"\n=== STATISTIQUES DE FILTRAGE ===")
        print(f"Lignes filtrées sans numéro d'inventaire: {self.filtered_no_inventory}")
        print(f"Lignes filtrées avec code pièce invalide: {self.filtered_invalid_room}")
        print(f"Lignes filtrées avec code pièce 'BREST': {self.filtered_brest}")
        print(f"Lignes filtrées avec bâtiments exclus (IA/VL/IB): {self.filtered_excluded_buildings}")
        print(f"Total des lignes filtrées: {self.filtered_no_inventory + self.filtered_invalid_room + self.filtered_brest + self.filtered_excluded_buildings}")

def main():
    # Chemins des fichiers
    script_dir = os.path.dirname(os.path.abspath(__file__))
    excel_file_path = os.path.join(script_dir, 'sauvegarde_Allfa_janvier_2025.ods')
    output_sql_path = os.path.join(script_dir, 'insert_data.sql')
    
    # Créer le générateur
    generator = SQLGenerator()
    
    try:
        # Générer le fichier SQL
        success, errors = generator.generate_sql_from_excel(excel_file_path, output_sql_path)
        
        print(f"\n=== RÉSULTATS ===")
        print(f"Fichier SQL généré: {output_sql_path}")
        print(f"Articles traités avec succès: {success}")
        print(f"Erreurs rencontrées: {errors}")
        
        # Afficher le résumé
        generator.print_summary()
        
        print(f"\nPour exécuter le script SQL:")
        print(f"psql -U username -d database_name -f {output_sql_path}")
        
    except Exception as e:
        print(f"Erreur fatale: {e}")

if __name__ == "__main__":
    main()