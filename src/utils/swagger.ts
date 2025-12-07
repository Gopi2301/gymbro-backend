
import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  apis: ['./src/routes/*.ts'], // files containing annotations as above
  definition: {
    components: {
      schemas: {
        CoachSignup: {
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
              format: 'email',
              type: 'string',
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
          type: 'object',
        },
        RefreshToken: {
          properties: {
            refresh_token: {
              type: 'string',
            },
          },
          required: ['refresh_token'],
          type: 'object',
        },
        Signin: {
          properties: {
            email: {
              format: 'email',
              type: 'string',
            },
            password: {
              type: 'string',
            },
          },
          required: ['email', 'password'],
          type: 'object',
        },
        Signup: {
          properties: {
            email: {
              format: 'email',
              type: 'string',
            },
            name: {
              type: 'string',
            },
            password: {
              type: 'string',
            },
            role: {
              enum: ['user', 'coach'],
              type: 'string',
            },
          },
          required: ['email', 'name', 'password', 'role'],
          type: 'object',
        },
        SuperAdminSignup: {
          properties: {
            email: {
              format: 'email',
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
          },
          required: ['email', 'name', 'password', 'role'],
          type: 'object',
        },
      },
    },
    info: {
      description: 'A simple Express API for the Gym Bro application',
      title: 'Gym Bro API',
      version: '1.0.0',
    },
    openapi: '3.0.0',
    servers: [
      {
        url: 'http://localhost:5000',
      },
    ],
  },
};

const openapiSpecification = swaggerJsdoc(options);

export default openapiSpecification;
