
import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Gym Bro API',
      version: '1.0.0',
      description: 'A simple Express API for the Gym Bro application',
    },
    servers: [
      {
        url: 'http://localhost:5000',
      },
    ],
    components: {
      schemas: {
        Signup: {
          type: 'object',
          properties: {
            email: {
              type: 'string',
              format: 'email',
            },
            name: {
              type: 'string',
            },
            password: {
              type: 'string',
            },
            role: {
              type: 'string',
              enum: ['user', 'coach'],
            },
          },
          required: ['email', 'name', 'password', 'role'],
        },
        Signin: {
          type: 'object',
          properties: {
            email: {
              type: 'string',
              format: 'email',
            },
            password: {
              type: 'string',
            },
          },
          required: ['email', 'password'],
        },
        RefreshToken: {
          type: 'object',
          properties: {
            refresh_token: {
              type: 'string',
            },
          },
          required: ['refresh_token'],
        },
        CoachSignup: {
          type: 'object',
          properties: {
            gymAddress: {
              type: 'string',
            },
            gymName: {
              type: 'string',
            },
            members: {
              type: 'string',
            },
            name: {
              type: 'string',
            },
            password: {
              type: 'string',
            },
            role: {
              type: 'string',
            },
            work_email: {
              type: 'string',
              format: 'email',
            },
          },
          required: [
            'gymAddress',
            'gymName',
            'members',
            'name',
            'password',
            'role',
            'work_email',
          ],
        },
      },
    },
  },
  apis: ['./src/routes/*.ts'], // files containing annotations as above
};

const openapiSpecification = swaggerJsdoc(options);

export default openapiSpecification;
