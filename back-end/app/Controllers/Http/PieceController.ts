import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Article from 'App/Models/Article'
import Piece from 'App/Models/Piece'

export default class PieceController {
  /**
   * List all rooms
   */
  public async index({ response }: HttpContextContract) {
    try {
      const piece = await Piece.all()
      return response.ok(piece)
    } catch (error) {
      return response.internalServerError({ error: 'Erreur lors de la recherche des pièces' })
    }
  }

  /**
   * Get a specific room by ID
   */
  public async show({ params, response }: HttpContextContract) {
    try {
      const piece = await Piece.find(params.id)

      if (!piece) {
        return response.notFound({ error: 'Pièce non trouvée' })
      }

      return response.ok(piece)
    } catch (error) {
      return response.internalServerError({ error: 'Impossible de retrouver la pièce' })
    }
  }

  /**
   * Get all rooms for a specific floor
   */
  public async getByEtage({ params, response }: HttpContextContract) {
    try {
      const pieces = await Piece.query().where('id_etage', params.id_etage).preload('etage')

      return response.ok(pieces)
    } catch (error) {
      return response.internalServerError({ error: 'Erreur lors de la recherche des pièces' })
    }
  }

  /**
   * Get a room by its name
   */
  public async getByName({ params, response }: HttpContextContract) {
    try {
      const piece = await Piece.query()
        .where('nom', params.nom)
        .preload('articles', (articleQuery) => {
          articleQuery.preload('categorieRelation').preload('etatRelation')
        })
        .preload('etage', (etageQuery) => {
          etageQuery.preload('batiment')
        })
        .first()

      if (!piece) {
        return response.notFound({ error: 'Pièce non trouvée' })
      }

      return response.ok(piece)
    } catch (error) {
      return response.internalServerError({ error: error.message })
    }
  }

  public async saveScan({ params, request, response }: HttpContextContract) {
    try {
      const piece = await Piece.find(params.id)
      const articlesId = request.body() as string[]

      const articles = await Article.query().whereIn('num_inventaire', articlesId)

      if (!piece) {
        return response.notFound({ error: 'Pièce non trouvée' })
      }

      await piece.related('articles').saveMany(articles)

      return response.ok({ message: 'Articles sauvegardés avec succès' })
    } catch (error) {
      return response.internalServerError({ error: 'Erreur lors de la sauvegarde du scan' })
    }
  }
}
