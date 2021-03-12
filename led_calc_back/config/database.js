module.exports = ({ env }) => ({
  defaultConnection: 'default',
  connections: {
    default: {
      connector: 'bookshelf',
      settings: {
        client: 'mysql',
        host: env('DATABASE_HOST', '92.53.96.132'),
        port: env('DATABASE_PORT', 3306),
        database: env('DATABASE_NAME', 'cv94171_calcled'),
        username: env('DATABASE_USERNAME', 'cv94171_calcled'),
        password: env('DATABASE_PASSWORD', 'BcvGD5fm'),
      },
      options: {
        useNullAsDefault: true,
      },
    },
  },
});
