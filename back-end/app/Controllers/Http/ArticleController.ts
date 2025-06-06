import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Article from 'App/Models/Article'
import Piece from 'App/Models/Piece'
import Database from '@ioc:Adonis/Lucid/Database'

export default class ArticleController {
  /**
   * List all articles
   */
  public async index({ response }: HttpContextContract) {
    try {
      const articles = await Article.query()
        .preload('piece', (pieceQuery) => {
          pieceQuery.preload('etage', (etageQuery) => {
            etageQuery.preload('batiment')
          })
        })
        .preload('categorieRelation')
      return response.ok(articles)
    } catch (error) {
      return response.internalServerError({ error: 'Erreur lors de la recherche des articles' })
    }
  }

  /**
   * Get all articles in a specific room
   */
  public async getByPiece({ params, response }: HttpContextContract) {
    try {
      const articles = await Article.query()
        .where('id_piece', params.id)
        .preload('piece')
        .preload('categorieRelation')
        .preload('etatRelation')

      return response.ok(articles)
    } catch (error) {
      return response.internalServerError({
        error: 'Erreur lors de la recherche des articles pour cette pièce',
      })
    }
  }

  /**
   * Get a specific article by num_inventaire
   */
  public async show({ params, response }: HttpContextContract) {
    try {
      const article = await Article.query()
        .where('num_inventaire', params.num_inventaire)
        .preload('piece')
        .preload('categorieRelation')
        .preload('etatRelation')
        .first()

      if (!article) {
        return response.notFound({ message: 'Article non trouvé' })
      }

      return response.ok(article)
    } catch (error) {
      return response.internalServerError({ error: "Impossible de retrouver l'article" })
    }
  }

  /**
   * Store a new article
   */
  public async store({ request, response }: HttpContextContract) {
    try {
      const articleData = request.only([
        'num_inventaire',
        'categorie',
        'id_piece',
        'num_serie',
        'num_bon_commande',
        'fournisseur',
        'code_fournisseur',
        'marque',
        'etat'
      ])

      // Validation basique
      if (!articleData.num_inventaire || !articleData.categorie || !articleData.id_piece ||
          !articleData.num_serie || !articleData.num_bon_commande || !articleData.fournisseur ||
           !articleData.code_fournisseur || !articleData.marque || !articleData.etat) {
        return response.status(400).json({
          error: 'Tous les champs sont requis',
        })
      }

      // Conversion des types
      articleData.categorie = Number(articleData.categorie)
      articleData.id_piece = Number(articleData.id_piece)

      // Création de l'article
      const article = new Article()
      article.num_inventaire = articleData.num_inventaire
      article.categorie = articleData.categorie
      article.id_piece = articleData.id_piece
      article.num_serie = articleData.num_serie
      article.num_bon_commande = articleData.num_bon_commande
      article.fournisseur = articleData.fournisseur
      article.code_fournisseur = articleData.code_fournisseur
      article.marque = articleData.marque
      article.etat = articleData.etat

      await article.save()

      return response.created(article)
    } catch (error) {
      console.error(error)
      return response.status(500).json({
        error: "Erreur lors de la création de l'article",
      })
    }
  }

  /**
   * Update an existing article by num_inventaire
   */
  public async update({ params, request, response }: HttpContextContract) {
    try {
      const article = await Article.query().where('num_inventaire', params.num_inventaire).first()

      if (!article) {
        return response.notFound({ message: 'Article non trouvé' })
      }

      const articleData = request.only([
        'num_inventaire',
        'categorie',
        'id_piece',
        'num_serie',
        'num_bon_commande',
        'fournisseur',
        'code_fournisseur',
        'marque',
        'etat'
      ])

      if (articleData.categorie) {
        articleData.categorie = parseInt(articleData.categorie)
      }
      if (articleData.id_piece) {
        articleData.id_piece = parseInt(articleData.id_piece)
      }

      article.merge(articleData)
      await article.save()

      return response.ok(article)
    } catch (error) {
      console.error(error)
      return response.internalServerError({
        error: "Erreur lors de la mise à jour de l'article",
      })
    }
  }

  /**
   * Search articles by inventory number, room name, category name, brand name, or supplier
   */
  public async search({ request, response }: HttpContextContract) {
    try {
      const { query } = request.qs()

      if (!query) {
        return response.badRequest({ error: 'Le paramètre de recherche est requis' })
      }

      // First, check if the query matches any room names
      const rooms = await Piece.query()
        .where('nom', 'ILIKE', `%${query}%`)
        .preload('etage', (etageQuery) => {
          etageQuery.preload('batiment')
        })

      // If we found rooms matching the query, only return those
      if (rooms.length > 0) {
        return response.ok({
          articles: [],
          rooms: rooms
        })
      }

      // If no rooms match, search for articles by category name
      const categoriesQuery = await Database.from('categorie')
        .where('nom', 'ILIKE', `%${query}%`)
        .select('id')

      if (categoriesQuery.length > 0) {
        const categoryIds = categoriesQuery.map(cat => cat.id)

        const articlesByCategory = await Article.query()
          .whereIn('categorie', categoryIds)
          .preload('piece', (pieceQuery) => {
            pieceQuery.preload('etage', (etageQuery) => {
              etageQuery.preload('batiment')
            })
          })
          .preload('categorieRelation')
          .preload('etatRelation')

        return response.ok({
          articles: articlesByCategory,
          rooms: []
        })
      }

      // If no categories match, search for articles by inventory number, brand name, supplier, or purchase order number
      const articlesByInventoryOrBrandOrSupplier = await Article.query()
        .where('num_inventaire', 'ILIKE', `%${query}%`)
        .orWhere('marque', 'ILIKE', `%${query}%`)
        .orWhere('fournisseur', 'ILIKE', `%${query}%`)
        .orWhere('num_bon_commande', 'ILIKE', `%${query}%`)
        .preload('piece', (pieceQuery) => {
          pieceQuery.preload('etage', (etageQuery) => {
            etageQuery.preload('batiment')
          })
        })
        .preload('categorieRelation')
        .preload('etatRelation')

      return response.ok({
        articles: articlesByInventoryOrBrandOrSupplier,
        rooms: []
      })
    } catch (error) {
      console.error(error)
      return response.internalServerError({
        error: 'Erreur lors de la recherche des articles et des salles'
      })
    }
  }
}
