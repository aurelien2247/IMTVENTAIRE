import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Batiment from 'App/Models/Batiment'
import Etage from 'App/Models/Etage'
import Piece from 'App/Models/Piece'
import Article from 'App/Models/Article'

export default class BatimentsController {
  /**
   * List all buildings
   */
  public async index({ response }: HttpContextContract) {
    try {
      const batiment = await Batiment.all()
      return response.ok(batiment)
    } catch (error) {
      return response.internalServerError({ error: 'Erreur lors de la recherche des bâtiments !' })
    }
  }

  /**
   * Get a specific building by ID
   */
  public async show({ params, response }: HttpContextContract) {
    try {
      const batiment = await Batiment.find(params.id)

      if (!batiment) {
        return response.notFound({ message: 'Batiment non trouvés !' })
      }

      return response.ok(batiment)
    } catch (error) {
      return response.internalServerError({ error: 'Impossible de retrouver de batiment.' })
    }
  }

  /**
   * Get a specific article by batiment, etage, piece, and article ID
   */
  public async getArticleByLocation({ params, response }: HttpContextContract) {
    try {
      const batiment = await Batiment.find(params.id_batiment)
      if (!batiment) {
        return response.notFound({ message: 'Bâtiment non trouvé !' })
      }

      const etage = await Etage.query()
        .where('id', params.id_etage)
        .where('id_batiment', params.id_batiment)
        .first()

      if (!etage) {
        return response.notFound({ message: 'Étage non trouvé pour ce bâtiment !' })
      }

      const piece = await Piece.query()
        .where('id', params.id_piece)
        .where('id_etage', params.id_etage)
        .first()

      if (!piece) {
        return response.notFound({ message: 'Pièce non trouvée pour cet étage !' })
      }

      const article = await Article.query()
        .where('num_inventaire', params.id_article)
        .where('id_piece', params.id_piece)
        .first()

      if (!article) {
        return response.notFound({ message: 'Article non trouvé dans cette pièce !' })
      }

      return response.ok(article)
    } catch (error) {
      console.error(error)
      return response.internalServerError({ error: 'Erreur lors de la recherche de l\'article !' })
    }
  }
}
