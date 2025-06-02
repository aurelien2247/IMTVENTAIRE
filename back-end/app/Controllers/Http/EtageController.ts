import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Etage from 'App/Models/Etage'


export default class EtageController {
  /**
   * List all floors
   */
  public async index({ response }: HttpContextContract) {
    try {
      const etage = await Etage.all()
      return response.ok(etage)
    } catch (error) {
      return response.internalServerError({ error: 'Erreur lors de la recherche des étages !' })
    }
  }

  /**
   * Get a specific floors by ID
   */
  public async show({ params, response }: HttpContextContract) {
    try {
      const etage = await Etage.find(params.id)

      if (!etage) {
        return response.notFound({ message: 'Etage non trouvés !' })
      }

      return response.ok(etage)
    } catch (error) {
      return response.internalServerError({ error: 'Impossible de retrouver l\'étage.' })
    }
  }

  /**
   * Get all floors for a specific building
   */
  public async getByBatiment({ params, response }: HttpContextContract) {
    try {
      const etages = await Etage.query().where('id_batiment', params.id_batiment)

      return response.ok(etages)
    } catch (error) {
      return response.internalServerError({ error: 'Erreur lors de la recherche des étages pour ce bâtiment !' })
    }
  }
}
