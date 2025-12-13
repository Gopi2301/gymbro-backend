
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
        Exercise: {
          properties: {
            description: {
              type: 'string',
            },
            equipment: {
              enum: [
                'barbell',
                'dumbbell',
                'kettlebell',
                'medicine ball',
                'plate',
                'rope',
                'sled',
                'tire',
                'weight plate',
                'body weight',
                'other',
              ],
              type: 'string',
            },
            name: {
              type: 'string',
            },
            primaryMuscle: {
              enum: [
                'chest',
                'back',
                'shoulders',
                'biceps',
                'triceps',
                'quadriceps',
                'hamstrings',
                'glutes',
                'calves',
                'abs',
                'forearms',
                'traps',
                'core',
                'cardio_system',
              ],
              type: 'string',
            },
            secondaryMuscle: {
              items: {
                enum: [
                  'chest',
                  'back',
                  'shoulders',
                  'biceps',
                  'triceps',
                  'quadriceps',
                  'hamstrings',
                  'glutes',
                  'calves',
                  'abs',
                  'forearms',
                  'traps',
                  'core',
                  'cardio_system',
                ],
                type: 'string',
              },
              type: 'array',
            },
            stabilizers: {
              items: {
                enum: [
                  'chest',
                  'back',
                  'shoulders',
                  'biceps',
                  'triceps',
                  'quadriceps',
                  'hamstrings',
                  'glutes',
                  'calves',
                  'abs',
                  'forearms',
                  'traps',
                  'core',
                  'cardio_system',
                ],
                type: 'string',
              },
              type: 'array',
            },
            type: {
              enum: [
                'compound',
                'isolation',
                'cardio',
                'plyometric',
                'stretching',
              ],
              type: 'string',
            },
            videoUrl: {
              type: 'string',
            },
          },
          required: ['name', 'primaryMuscle', 'type', 'equipment'],
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
