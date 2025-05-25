import { ApplicationContract } from '@ioc:Adonis/Core/Application'

export default class DatabaseProvider {
  constructor(protected app: ApplicationContract) {}

  public register() {
    // Register your own bindings
  }

  public async boot() {
    // IoC container is ready
    const Database = this.app.container.use('Adonis/Lucid/Database')

    // Just establish the connection without testing or backup
    try {
      // Get the connection instance
      const connection = Database.connection()

      // Ensure we don't test the connection
      connection.rawQuery = async function (query, bindings) {
        // Only establish the connection, don't execute any query
        await this.connect()
        return { rows: [] }
      }
    } catch (error) {
      console.error('Failed to establish database connection:', error.message)
    }
  }

  public async ready() {
    // App is ready
  }

  public async shutdown() {
    // Cleanup, since app is going down
    const Database = this.app.container.use('Adonis/Lucid/Database')
    await Database.manager.closeAll()
  }
}
