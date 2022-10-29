module.exports = {
  openapi: '3.0.0',
  info: {
    title: 'Sahaware Back End',
    version: '1.0.0',
  },
  _servers: [
    {
      url: process.env.HOST,
    },
  ],
  tags: [
    {
      name: 'Authentication',
    },
    {
      name: 'Category',
    },
    {
      name: 'Article',
    },
  ],
  paths: {
    '/api/auth/register': {
      post: {
        tags: ['Authentication'],
        summary: 'Register for a new user.',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  email: {
                    type: 'string',
                  },
                  password: {
                    type: 'string',
                  },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: 'Register success.'
          },
          400: {
            description: 'Invalid email or email has been already used.'
          },
        },
      },
    },
    '/api/auth/login': {
      post: {
        tags: ['Authentication'],
        summary: 'Login to get credential token.',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  email: {
                    type: 'string',
                  },
                  password: {
                    type: 'string',
                  },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: 'Login success.'
          },
          400: {
            description: 'Invalid email or invalid password.'
          },
        },
      },
    },
    '/api/article-category': {
      get: {
        tags: ['Category'],
        summary: 'List categories.',
        responses: {
          200: {
            description: 'Success.'
          },
          404: {
            description: 'There is no category yet.'
          },
        },
      },
    },
    '/api/article-category/{id}': {
      get: {
        tags: ['Category'],
        summary: 'Get categoriy by ID.',
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'Article category ID',
          },
        ],
        responses: {
          200: {
            description: 'Success.'
          },
          404: {
            description: 'Category not found.'
          },
        },
      },
    },
    '/api/article-category/create': {
      post: {
        tags: ['Category'],
        summary: 'Create a new category.',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  name: {
                    type: 'string',
                  },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: 'Create success.'
          },
          400: {
            description: 'Category data is not complete or category already exists.'
          },
        },
      },
    },
    '/api/article': {
      get: {
        tags: ['Article'],
        summary: 'List articles.',
        responses: {
          200: {
            description: 'Success.'
          },
          404: {
            description: 'There is no article yet.'
          },
        },
      },
    },
    '/api/article/{id}': {
      get: {
        tags: ['Article'],
        summary: 'Get article by ID.',
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'Article ID',
          },
        ],
        responses: {
          200: {
            description: 'Success.'
          },
          404: {
            description: 'Article not found.'
          },
        },
      },
    },
    '/api/article/create': {
      post: {
        tags: ['Article'],
        summary: 'Create a new article.',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  name: {
                    type: 'string',
                  },
                  content: {
                    type: 'string',
                  },
                  categoryId: {
                    type: 'number',
                  },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: 'Create success.'
          },
          400: {
            description: 'Article data is not complete.'
          },
        },
      },
    },
  }
};
