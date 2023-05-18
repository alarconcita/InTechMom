import swaggerJSDoc from "swagger-jsdoc";

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'MVP - InTechMom',
      version: '1.0.0',
    },
  },
  apis: [
    'app.js',
    './src/api/users/controllers.js'
  ],
};

export const openApiSpecification = swaggerJSDoc(swaggerOptions);