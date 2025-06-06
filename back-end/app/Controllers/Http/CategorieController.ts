import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Categorie from 'App/Models/Categorie'

export default class CategorieController {
  /**
   * Add a category
   */
  public async add({ request, response }: HttpContextContract) {
    try {
      const data = request.only(['nom'])
      if (!data.nom) {
        return response.badRequest({ error: "Le champ 'nom' est requis." })
      }
      const newCategorie = await Categorie.create({
        nom: data.nom,
      })

      return response.created(newCategorie)
    } catch (error) {
      console.error(error)
      return response.internalServerError({ error: "Erreur lors de l'ajout d'une catégorie" })
    }
  }

  /**
   * Get all categories
   */
  public async getAll({ response }: HttpContextContract) {
    try {
      const articles = await Categorie.all()
      return response.ok(articles)
    } catch (error) {
      return response.internalServerError({ error: 'Erreur lors de la recherche des catégories' })
    }
  }
}
