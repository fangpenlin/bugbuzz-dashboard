/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'bugbuzz-dashboard',
    environment: environment,
    baseURL: '/',
    locationType: 'auto',
    apiURL: 'http://127.0.0.1:9090',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

  ENV.contentSecurityPolicy = {
    'default-src': "'none'",
    'script-src': "'self' https://maxcdn.bootstrapcdn.com https://code.jquery.com https://cdn.pubnub.com",
    'font-src': "'self' https://maxcdn.bootstrapcdn.com",
    'connect-src': "'self' http://*.pubnub.com " + ENV.apiURL,
    'img-src': "'self'",
    'style-src': "'self' 'unsafe-inline' https://maxcdn.bootstrapcdn.com", // Allow inline styles and loaded CSS from http://fonts.googleapis.com 
    'media-src': "'self'"
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
    ENV.contentSecurityPolicy['script-src'] += " http://127.0.0.1:35729";
    ENV.contentSecurityPolicy['connect-src'] += " ws://127.0.0.1:35729";

    ENV.pubnubSubscribeKey = 'sub-c-740140b8-de7c-11e4-bb6f-0619f8945a4f';
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {

  }

  return ENV;
};
