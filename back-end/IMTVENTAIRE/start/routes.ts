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

Route.get('/', async () => {
  return { hello: 'world' }
})

// Routes pour batiments
Route.get('/batiments', 'BatimentsController.index')
Route.get('/batiments/:id', 'BatimentsController.show')
Route.get('/:id_batiment/:id_etage/:id_piece/:id_article', 'BatimentsController.getArticleByLocation')

// Routes pour étages
Route.get('/etage', 'EtageController.index')
Route.get('/etage/:id', 'EtageController.show')

// Routes pour Piece
Route.get('/piece', 'PieceController.index')
Route.get('/piece/:id', 'PieceController.show')

// Routes pour Article
Route.get('/article', 'ArticleController.index')
Route.get('/article/:id', 'ArticleController.show')
Route.post('/article', 'ArticleController.store')
Route.put('/article/:num_inventaire', 'ArticleController.update')
