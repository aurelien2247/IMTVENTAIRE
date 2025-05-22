import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Batiment from 'App/Models/Batiment'

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
}
