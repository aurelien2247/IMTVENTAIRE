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
 * /zones:
 *   get:
 *     tags:
 *       - Zones
 *     description: Récupère la liste de toutes les zones avec leurs bâtiments
 *     responses:
 *       200:
 *         description: Liste des zones avec leurs bâtiments
 */
Route.get('/zones', 'ZoneController.index')

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
 * /batiments/{id_batiment}:
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
Route.get('/batiments/:id_batiment', 'EtageController.getByBatiment')

/**
 * @swagger
 * /etages/{id_etage}:
 *   get:
 *     tags:
 *       - Pièces
 *     description: Récupère toutes les pièces d'un étage spécifique
 *     parameters:
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
Route.get('/etages/:id_etage', 'PieceController.getByEtage')

/**
 * @swagger
 * /pieces/{id}:
 *   get:
 *     tags:
 *       - Articles
 *     description: Récupère tous les articles d'une pièce spécifique
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Identifiant de la pièce
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Liste des articles de la pièce
 */
Route.get('/pieces/:id', 'ArticleController.getByPiece')

/**
 * @swagger
 * /pieces/{nom}:
 *   get:
 *     tags:
 *       - Pièces
 *     description: Récupère une pièce par son nom
 *     parameters:
 *       - in: path
 *         name: nom
 *         required: true
 *         description: Nom de la pièce
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Pièce trouvée
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Piece'
 *       404:
 *         description: Pièce non trouvée
 */
Route.get('/pieces/nom/:nom', 'PieceController.getByName')

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
 * /article/{num_inventaire}:
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
 */
Route.get('/article/:num_inventaire', 'ArticleController.show')

Route.post('/categories', 'CategorieController.add')
Route.get('/categories', 'CategorieController.getAll')
