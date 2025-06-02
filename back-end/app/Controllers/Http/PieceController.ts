import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Piece from 'App/Models/Piece'

export default class BatimentsController {
  /**
   * List all rooms
   */
  public async index({ response }: HttpContextContract) {
    try {
      const piece = await Piece.all()
      return response.ok(piece)
    } catch (error) {
      return response.internalServerError({ error: 'Erreur lors de la recherche des pièces !' })
    }
  }

  /**
   * Get a specific room by ID
   */
  public async show({ params, response }: HttpContextContract) {
    try {
      const piece = await Piece.find(params.id)

      if (!piece) {
        return response.notFound({ message: 'Pièce non trouvée !' })
      }

      return response.ok(piece)
    } catch (error) {
      return response.internalServerError({ error: 'Impossible de retrouver la pièce.' })
    }
  }
}
