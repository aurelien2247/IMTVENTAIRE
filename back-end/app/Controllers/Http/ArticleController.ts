import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Article from 'App/Models/Article'

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
   * Get a specific article by ID
   */
  public async show({ params, response }: HttpContextContract) {
    try {
      const article = await Article.find(params.id)

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

      const article = await Article.create(articleData)

      return response.created(article)
    } catch (error) {
      return response.internalServerError({
        error: 'Erreur lors de la création de l\'article !'
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
