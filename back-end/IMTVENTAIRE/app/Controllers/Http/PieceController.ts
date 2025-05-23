import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Piece from 'App/Models/Piece'

export default class BatimentsController {
  /**
   * List all buildings
   */
  public async index({ response }: HttpContextContract) {
    try {
      const piece = await Piece.all()
      return response.ok(piece)
    } catch (error) {
      return response.internalServerError({ error: 'Erreur lors de la recherche des bâtiments !' })
    }
  }

  /**
   * Get a specific building by ID
   */
  public async show({ params, response }: HttpContextContract) {
    try {
      const piece = await Piece.find(params.id)

      if (!piece) {
        return response.notFound({ message: 'Batiment non trouvés !' })
      }

      return response.ok(piece)
    } catch (error) {
      return response.internalServerError({ error: 'Impossible de retrouver de batiment.' })
    }
  }
}
