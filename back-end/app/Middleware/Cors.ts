import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class Cors {
  public async handle({ request, response }: HttpContextContract, next: () => Promise<void>) {
    const allowedOrigins = [
      'https://localhost:5173',
      'https://192.168.1.100:5173',
      'https://10.144.193.151:5173',
      'https://198.19.249.3:5173',
      'https://127.0.0.1:5173',
    ]

    const origin = request.header('origin')
    if (origin && allowedOrigins.includes(origin)) {
      response.header('Access-Control-Allow-Origin', origin)
      response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
      response.header(
        'Access-Control-Allow-Headers',
        'Content-Type, Authorization, X-Requested-With'
      )
      response.header('Access-Control-Allow-Credentials', 'true')
      response.header('Access-Control-Max-Age', '86400') // 24 heures
    }

    // Répondre immédiatement aux requêtes OPTIONS (pre-flight)
    if (request.method() === 'OPTIONS') {
      return response.status(204).send('')
    }

    await next()
  }
}
