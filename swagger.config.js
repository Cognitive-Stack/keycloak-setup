const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Keycloak Configuration API',
      version: '1.0.0',
      description: 'An API to programmatically configure Keycloak authentication flows.',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./src/routes/*.js'], // files containing annotations as above
};

const openapiSpecification = swaggerJsdoc(options);

module.exports = openapiSpecification;
