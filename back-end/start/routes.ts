/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'
import './swagger'

/**
 * @swagger
 * /:
 *   get:
 *     tags:
 *       - Général
 *     description: Point de terminaison de test pour vérifier que l'API fonctionne
 *     responses:
 *       200:
 *         description: Message de bienvenue
 */
Route.get('/', async () => {
  return { hello: 'world' }
})

/**
 * @swagger
 * /batiments:
 *   get:
 *     tags:
 *       - Bâtiments
 *     description: Récupère la liste de tous les bâtiments
 *     responses:
 *       200:
 *         description: Liste des bâtiments
 */
Route.get('/batiments', 'BatimentsController.index')

/**
 * @swagger
 * /batiments/{id}:
 *   get:
 *     tags:
 *       - Bâtiments
 *     description: Récupère les détails d'un bâtiment spécifique
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Identifiant du bâtiment
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Détails du bâtiment
 *       404:
 *         description: Bâtiment non trouvé
 */
Route.get('/batiments/:id', 'BatimentsController.show')

/**
 * @swagger
 * /batiments/{id_batiment}/etages:
 *   get:
 *     tags:
 *       - Étages
 *     description: Récupère tous les étages d'un bâtiment spécifique
 *     parameters:
 *       - in: path
 *         name: id_batiment
 *         required: true
 *         description: Identifiant du bâtiment
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Liste des étages du bâtiment
 */
Route.get('/batiments/:id_batiment/etages', 'EtageController.getByBatiment')

/**
 * @swagger
 * /batiments/{id_batiment}/etages/{id_etage}/pieces:
 *   get:
 *     tags:
 *       - Pièces
 *     description: Récupère toutes les pièces d'un étage spécifique
 *     parameters:
 *       - in: path
 *         name: id_batiment
 *         required: true
 *         description: Identifiant du bâtiment
 *         schema:
 *           type: integer
 *       - in: path
 *         name: id_etage
 *         required: true
 *         description: Identifiant de l'étage
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Liste des pièces de l'étage
 */
Route.get('/batiments/:id_batiment/etages/:id_etage/pieces', 'PieceController.getByEtage')

/**
 * @swagger
 * /batiments/{id_batiment}/etages/{id_etage}/pieces/{id_piece}/articles:
 *   get:
 *     tags:
 *       - Articles
 *     description: Récupère tous les articles d'une pièce spécifique
 *     parameters:
 *       - in: path
 *         name: id_batiment
 *         required: true
 *         description: Identifiant du bâtiment
 *         schema:
 *           type: integer
 *       - in: path
 *         name: id_etage
 *         required: true
 *         description: Identifiant de l'étage
 *         schema:
 *           type: integer
 *       - in: path
 *         name: id_piece
 *         required: true
 *         description: Identifiant de la pièce
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Liste des articles de la pièce
 */
Route.get('/batiments/:id_batiment/etages/:id_etage/pieces/:id_piece/articles', 'ArticleController.getByPiece')

/**
 * @swagger
 * /batiments/{id_batiment}/etages/{id_etage}/pieces/{id_piece}/articles/{num_inventaire}:
 *   get:
 *     tags:
 *       - Articles
 *     description: Récupère un article par sa localisation (bâtiment, étage, pièce)
 *     parameters:
 *       - in: path
 *         name: id_batiment
 *         required: true
 *         description: Identifiant du bâtiment
 *         schema:
 *           type: integer
 *       - in: path
 *         name: id_etage
 *         required: true
 *         description: Identifiant de l'étage
 *         schema:
 *           type: integer
 *       - in: path
 *         name: id_piece
 *         required: true
 *         description: Identifiant de la pièce
 *         schema:
 *           type: integer
 *       - in: path
 *         name: num_inventaire
 *         required: true
 *         description: Numéro d'inventaire de l'article
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Article trouvé
 *       404:
 *         description: Article non trouvé
 */
Route.get('/batiments/:id_batiment/etages/:id_etage/pieces/:id_piece/articles/:num_inventaire', 'BatimentsController.getArticleByLocation')

/**
 * @swagger
 * /etages:
 *   get:
 *     tags:
 *       - Étages
 *     description: Récupère la liste de tous les étages
 *     responses:
 *       200:
 *         description: Liste des étages
 */
Route.get('/etages', 'EtageController.index')

/**
 * @swagger
 * /etages/{id}:
 *   get:
 *     tags:
 *       - Étages
 *     description: Récupère les détails d'un étage spécifique
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Identifiant de l'étage
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Détails de l'étage
 *       404:
 *         description: Étage non trouvé
 */
Route.get('/etages/:id', 'EtageController.show')

/**
 * @swagger
 * /pieces:
 *   get:
 *     tags:
 *       - Pièces
 *     description: Récupère la liste de toutes les pièces
 *     responses:
 *       200:
 *         description: Liste des pièces
 */
Route.get('/pieces', 'PieceController.index')

/**
 * @swagger
 * /pieces/{id}:
 *   get:
 *     tags:
 *       - Pièces
 *     description: Récupère les détails d'une pièce spécifique
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Identifiant de la pièce
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Détails de la pièce
 *       404:
 *         description: Pièce non trouvée
 */
Route.get('/pieces/:id', 'PieceController.show')

/**
 * @swagger
 * /articles:
 *   get:
 *     tags:
 *       - Articles
 *     description: Récupère la liste de tous les articles
 *     responses:
 *       200:
 *         description: Liste des articles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Article'
 *   post:
 *     tags:
 *       - Articles
 *     description: Crée un nouvel article
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ArticleInput'
 *     responses:
 *       201:
 *         description: Article créé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Article'
 *       400:
 *         description: Données invalides
 */
Route.get('/articles', 'ArticleController.index')
Route.post('/articles', 'ArticleController.store')

/**
 * @swagger
 * /articles/{num_inventaire}:
 *   get:
 *     tags:
 *       - Articles
 *     description: Récupère les détails d'un article spécifique
 *     parameters:
 *       - in: path
 *         name: num_inventaire
 *         required: true
 *         description: Numéro d'inventaire de l'article
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Détails de l'article
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Article'
 *       404:
 *         description: Article non trouvé
 *   put:
 *     tags:
 *       - Articles
 *     description: Met à jour un article existant
 *     parameters:
 *       - in: path
 *         name: num_inventaire
 *         required: true
 *         description: Numéro d'inventaire de l'article
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ArticleInput'
 *     responses:
 *       200:
 *         description: Article mis à jour avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Article'
 *       404:
 *         description: Article non trouvé
 *       400:
 *         description: Données invalides
 */
Route.put('/articles/:num_inventaire', 'ArticleController.update')

/**
 * @swagger
 * components:
 *   schemas:
 *     ArticleInput:
 *       type: object
 *       required:
 *         - num_inventaire
 *         - categorie
 *         - id_piece
 *         - num_serie
 *         - num_bon_commande
 *       properties:
 *         num_inventaire:
 *           type: string
 *           example: "A1234"
 *           description: Numéro d'inventaire unique de l'article
 *         categorie:
 *           type: integer
 *           example: 1
 *           description: Identifiant de la catégorie de l'article
 *         id_piece:
 *           type: integer
 *           example: 3
 *           description: Identifiant de la pièce où se trouve l'article
 *         num_serie:
 *           type: string
 *           example: "SN123456789"
 *           description: Numéro de série de l'article
 *         num_bon_commande:
 *           type: string
 *           example: "BC123456"
 *           description: Numéro du bon de commande
 *     Article:
 *       allOf:
 *         - $ref: '#/components/schemas/ArticleInput'
 */

Route.post('/categories', 'CategorieController.add')
Route.get('/categories', 'CategorieController.getAll')