export const {
  APP_PORT = 4000,
  NODE_ENV = 'development',
  DB_USERNAME = 'test',
  DB_PASSWORD = 'test123',
  DB_HOST = 'ds055990.mlab.com',
  DB_PORT = '55990',
  DB_NAME = 'local-chat'
} = process.env

export const IN_PROD = NODE_ENV === 'production'
