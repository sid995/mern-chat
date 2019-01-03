export const {
  APP_PORT = 8000,
  NODE_ENV = 'development',
  DB_USERNAME = 'test',
  DB_PASSWORD = 'test123',
  DB_HOST = 'ds055990.mlab.com',
  DB_PORT = '55990',
  DB_NAME = 'local-chat',

  SESS_NAME = 'sid',
  SESS_SECRET = 'ssh!secret',
  SESS_LIFETIME = 1000 * 60 * 60 * 2,

  REDIS_HOST = 'localhost',
  REDIS_PORT = 6379,
  REDIS_PASS = 'secret'
} = process.env

export const IN_PROD = NODE_ENV === 'production'
