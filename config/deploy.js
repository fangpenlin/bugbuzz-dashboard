module.exports = {
  production: {
    store: {},
    assets: {
      accessKeyId: process.env['AWS_ACCESS_KEY'],
      secretAccessKey: process.env['AWS_SECRET_KEY'],
      bucket: 'dashboard.bugbuzz.io',
      region: 'us-west-1'
    }
  }
};