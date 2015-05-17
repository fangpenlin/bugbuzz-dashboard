module.exports = {
  production: {
    store: {
      host: 'production-redis.example.com',
      port: 6379,
      password: '<your-redis-secret>'
    },
    assets: {
      accessKeyId: process.env['AWS_ACCESS_KEY'],
      secretAccessKey: process.env['AWS_SECRET_KEY'],
      bucket: 'dashboard.bugbuzz.io',
      region: 'us-west-1'
    }
  }
};