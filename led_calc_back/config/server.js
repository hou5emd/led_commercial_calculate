module.exports = ({ env }) => ({
  host: env('HOST', 'localhost'),
  port: env.int('PORT', 1337),
  production: true,
  admin: {
    auth: {
      secret: env('ADMIN_JWT_SECRET', '77a534affa311e3c3635db723c743ca7'),
    },
  },
});
