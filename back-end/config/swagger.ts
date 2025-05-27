import { SwaggerConfig } from 'adonis-swagger'

export default {
  uiEnabled: true, //disable or enable swaggerUi route
  uiUrl: 'swagger', // url path to swaggerUI
  specEnabled: true, //disable or enable swagger.json route
  specUrl: '/swagger.json',

  middleware: [], // middlewares array, for protect your swagger docs and spec endpoints

  options: {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Documentation API IMTventaire',
        version: '1.0.0',
        description: 'Documentation complète de l\'API IMTventaire pour la gestion d\'inventaire',
        contact: {
          email: 'contact@imtventaire.fr'
        },
      },
      servers: [
        {
          url: '/',
          description: 'Current Server'
        }
      ],
      paths: {
        '/': {
          get: {
            tags: ['Général'],
            summary: 'Point de terminaison de test',
            description: 'Point de terminaison de test pour vérifier que l\'API fonctionne',
            responses: {
              '200': {
                description: 'Message de bienvenue'
              }
            }
          }
        },
        '/batiments': {
          get: {
            tags: ['Bâtiments'],
            summary: 'Liste des bâtiments',
            description: 'Récupère la liste de tous les bâtiments',
            responses: {
              '200': {
                description: 'Liste des bâtiments'
              }
            }
          }
        },
        '/batiments/{id}': {
          get: {
            tags: ['Bâtiments'],
            summary: 'Détails d\'un bâtiment',
            description: 'Récupère les détails d\'un bâtiment spécifique',
            parameters: [
              {
                name: 'id',
                in: 'path',
                required: true,
                description: 'Identifiant du bâtiment',
                schema: {
                  type: 'integer'
                }
              }
            ],
            responses: {
              '200': {
                description: 'Détails du bâtiment'
              },
              '404': {
                description: 'Bâtiment non trouvé'
              }
            }
          }
        },
        '/etage': {
          get: {
            tags: ['Étages'],
            summary: 'Liste des étages',
            description: 'Récupère la liste de tous les étages',
            responses: {
              '200': {
                description: 'Liste des étages'
              }
            }
          }
        },
        '/etage/{id}': {
          get: {
            tags: ['Étages'],
            summary: 'Détails d\'un étage',
            description: 'Récupère les détails d\'un étage spécifique',
            parameters: [
              {
                name: 'id',
                in: 'path',
                required: true,
                description: 'Identifiant de l\'étage',
                schema: {
                  type: 'integer'
                }
              }
            ],
            responses: {
              '200': {
                description: 'Détails de l\'étage'
              },
              '404': {
                description: 'Étage non trouvé'
              }
            }
          }
        },
        '/piece': {
          get: {
            tags: ['Pièces'],
            summary: 'Liste des pièces',
            description: 'Récupère la liste de toutes les pièces',
            responses: {
              '200': {
                description: 'Liste des pièces'
              }
            }
          }
        },
        '/piece/{id}': {
          get: {
            tags: ['Pièces'],
            summary: 'Détails d\'une pièce',
            description: 'Récupère les détails d\'une pièce spécifique',
            parameters: [
              {
                name: 'id',
                in: 'path',
                required: true,
                description: 'Identifiant de la pièce',
                schema: {
                  type: 'integer'
                }
              }
            ],
            responses: {
              '200': {
                description: 'Détails de la pièce'
              },
              '404': {
                description: 'Pièce non trouvée'
              }
            }
          }
        },
        '/article': {
          get: {
            tags: ['Articles'],
            summary: 'Liste des articles',
            description: 'Récupère la liste de tous les articles',
            responses: {
              '200': {
                description: 'Liste des articles'
              }
            }
          },
          post: {
            tags: ['Articles'],
            summary: 'Créer un article',
            description: 'Crée un nouvel article',
            requestBody: {
              required: true,
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      nom: {
                        type: 'string',
                        description: 'Nom de l\'article'
                      },
                      description: {
                        type: 'string',
                        description: 'Description de l\'article'
                      },
                      num_inventaire: {
                        type: 'string',
                        maxLength: 5,
                        description: 'Numéro d\'inventaire unique (5 caractères maximum)'
                      },
                      id_piece: {
                        type: 'integer',
                        description: 'Identifiant de la pièce où se trouve l\'article'
                      }
                    }
                  }
                }
              }
            },
            responses: {
              '201': {
                description: 'Article créé avec succès'
              },
              '400': {
                description: 'Données invalides'
              }
            }
          }
        },
        '/article/{id}': {
          get: {
            tags: ['Articles'],
            summary: 'Détails d\'un article',
            description: 'Récupère les détails d\'un article spécifique',
            parameters: [
              {
                name: 'id',
                in: 'path',
                required: true,
                description: 'Identifiant de l\'article',
                schema: {
                  type: 'integer'
                }
              }
            ],
            responses: {
              '200': {
                description: 'Détails de l\'article'
              },
              '404': {
                description: 'Article non trouvé'
              }
            }
          }
        },
        '/article/{num_inventaire}': {
          put: {
            tags: ['Articles'],
            summary: 'Mettre à jour un article',
            description: 'Met à jour un article existant',
            parameters: [
              {
                name: 'num_inventaire',
                in: 'path',
                required: true,
                description: 'Numéro d\'inventaire de l\'article',
                schema: {
                  type: 'string'
                }
              }
            ],
            requestBody: {
              required: true,
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      nom: {
                        type: 'string',
                        description: 'Nouveau nom de l\'article'
                      },
                      description: {
                        type: 'string',
                        description: 'Nouvelle description de l\'article'
                      },
                      id_piece: {
                        type: 'integer',
                        description: 'Nouvel identifiant de la pièce'
                      }
                    }
                  }
                }
              }
            },
            responses: {
              '200': {
                description: 'Article mis à jour avec succès'
              },
              '404': {
                description: 'Article non trouvé'
              },
              '400': {
                description: 'Données invalides'
              }
            }
          }
        }
      }
    },

    apis: [
      './app/**/*.ts',
      './start/routes.ts'
    ],
    basePath: '/'
  },
  mode: process.env.NODE_ENV === 'production' ? 'PRODUCTION' : 'RUNTIME',
  specFilePath: 'docs/swagger.json'
} as SwaggerConfig 