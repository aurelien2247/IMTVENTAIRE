import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Article from 'App/Models/Article'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { CustomMessages } from '@ioc:Adonis/Core/Validator'
import Piece from 'App/Models/Piece'

export default class ArticleController {
  /**
   * List all articles
   */
  public async index({ response }: HttpContextContract) {
    try {
      const articles = await Article.all()
      return response.ok(articles)
    } catch (error) {
      return response.internalServerError({ error: 'Erreur lors de la recherche des articles !' })
    }
  }

  /**
   * Get all articles in a specific room
   */
  public async getByPiece({ params, response }: HttpContextContract) {
    try {
      const articles = await Article.query().where('id_piece', params.id_piece)
      const piece = await Piece.find(params.id_piece)

      if (!piece) {
        return response.notFound({ message: 'Aucun article trouvé pour cette pièce' })
      }

      const articlesWithPiece = articles.map(article => ({
        num_inventaire: article.num_inventaire,
        categorie: article.categorie,
        num_serie: article.num_serie,
        num_bon_commande: article.num_bon_commande,
        etat: article.etat,
        piece: piece
      }))

      return response.ok({ articles: articlesWithPiece, piece })
    } catch (error) {
      return response.internalServerError({ error: 'Erreur lors de la recherche des articles pour cette pièce' })
    }
  }

  /**
   * Get a specific article by num_inventaire
   */
  public async show({ params, response }: HttpContextContract) {
    try {
      const article = await Article.findBy('num_inventaire', params.num_inventaire)

      if (!article) {
        return response.notFound({ message: 'Article non trouvé !' })
      }

      return response.ok(article)
    } catch (error) {
      return response.internalServerError({ error: 'Impossible de retrouver l\'article.' })
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
        'num_bon_commande'
      ])

      // Validation basique
      if (!articleData.num_inventaire || !articleData.categorie || !articleData.id_piece ||
          !articleData.num_serie || !articleData.num_bon_commande) {
        return response.status(400).json({
          error: 'Tous les champs sont requis'
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

      await article.save()

      return response.created(article)
    } catch (error) {
      console.error(error)
      return response.status(500).json({
        error: 'Erreur lors de la création de l\'article'
      })
    }
  }

  /**
   * Update an existing article by num_inventaire
   */
  public async update({ params, request, response }: HttpContextContract) {
    try {
      const article = await Article.query()
        .where('num_inventaire', params.num_inventaire)
        .first()

      if (!article) {
        return response.notFound({ message: 'Article non trouvé !' })
      }

      const articleData = request.only([
        'categorie',
        'id_piece',
        'num_serie',
        'num_bon_commande'
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
        error: 'Erreur lors de la mise à jour de l\'article !'
      })
    }
  }
}
