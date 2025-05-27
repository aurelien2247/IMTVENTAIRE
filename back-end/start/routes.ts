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
 * /{id_batiment}/{id_etage}/{id_piece}/{num_inventaire}:
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
Route.get('/:id_batiment/:id_etage/:id_piece/:num_inventaire', 'BatimentsController.getArticleByLocation')

/**
 * @swagger
 * /etage:
 *   get:
 *     tags:
 *       - Étages
 *     description: Récupère la liste de tous les étages
 *     responses:
 *       200:
 *         description: Liste des étages
 */
Route.get('/etage', 'EtageController.index')

/**
 * @swagger
 * /etage/{id}:
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
Route.get('/etage/:id', 'EtageController.show')

/**
 * @swagger
 * /piece:
 *   get:
 *     tags:
 *       - Pièces
 *     description: Récupère la liste de toutes les pièces
 *     responses:
 *       200:
 *         description: Liste des pièces
 */
Route.get('/piece', 'PieceController.index')

/**
 * @swagger
 * /piece/{id}:
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
Route.get('/piece/:id', 'PieceController.show')

/**
 * @swagger
 * /article:
 *   get:
 *     tags:
 *       - Articles
 *     description: Récupère la liste de tous les articles
 *     responses:
 *       200:
 *         description: Liste des articles
 *   post:
 *     tags:
 *       - Articles
 *     description: Crée un nouvel article
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nom:
 *                 type: string
 *                 description: Nom de l'article
 *               description:
 *                 type: string
 *                 description: Description de l'article
 *               num_inventaire:
 *                 type: string
 *                 description: Numéro d'inventaire unique
 *               id_piece:
 *                 type: integer
 *                 description: Identifiant de la pièce où se trouve l'article
 *     responses:
 *       201:
 *         description: Article créé avec succès
 *       400:
 *         description: Données invalides
 */
Route.get('/article', 'ArticleController.index')
Route.post('/article', 'ArticleController.store')

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
 *       404:
 *         description: Article non trouvé
 */
Route.get('/article/:num_inventaire', 'ArticleController.show')

/**
 * @swagger
 * /article/{num_inventaire}:
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
 *             type: object
 *             properties:
 *               nom:
 *                 type: string
 *                 description: Nouveau nom de l'article
 *               description:
 *                 type: string
 *                 description: Nouvelle description de l'article
 *               id_piece:
 *                 type: integer
 *                 description: Nouvel identifiant de la pièce
 *     responses:
 *       200:
 *         description: Article mis à jour avec succès
 *       404:
 *         description: Article non trouvé
 *       400:
 *         description: Données invalides
 */
Route.put('/article/:num_inventaire', 'ArticleController.update')
