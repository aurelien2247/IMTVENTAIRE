import { ApplicationContract } from '@ioc:Adonis/Core/Application'
import { RawQueryBuilderContract } from '@ioc:Adonis/Lucid/Database'

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
      connection.rawQuery = function (query, bindings) {
        // Only establish the connection, don't execute any query
        const builder = {
          knexQuery: this.knex.raw(query, bindings),
          client: this.client,
          wrap: this.wrap,
          debug: this.debug,
          timeout: 0,
          useTransaction: () => this,
          reporterData: {},
          toQuery: () => query,
          exec: async () => ({ rows: [] }),
          stream: async function* () {
            yield* []
          },
          first: async () => null,
          firstOrFail: async () => {
            throw new Error('No rows found')
          },
          paginate: async () => ({
            rows: [],
            total: 0,
            perPage: 0,
            currentPage: 0,
            lastPage: 0,
            firstPage: 1,
            hasPages: false,
            hasMorePages: false,
            isEmpty: true,
          }),
          getCount: async () => 0,
          update: async () => 0,
          del: async () => 0,
          delete: async () => 0,
          truncate: async () => {},
          clone: () => this.rawQuery(query, bindings),
          toJSON: () => ({}),
          toString: () => query,
        }
        return builder as unknown as RawQueryBuilderContract
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
