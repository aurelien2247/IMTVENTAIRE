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
}
