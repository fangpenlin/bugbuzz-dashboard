import Ember from 'ember';
import { normalizeURLSafeBase64 } from '../utils/base64';

export default Ember.Route.extend({
  shortcuts: {
    'h': 'returnFunction',
    'j': 'next',
    'l': 'step',
    'c': 'resume'
  },
  actions: {
    returnFunction: function(){
      this.get('controller').send('returnFunction');
    },
    next: function(){
      this.get('controller').send('next');
    },
    step: function(){
      this.get('controller').send('step');
    },
    resume: function(){
      this.get('controller').send('resume');
    }
  },
  renderTemplate: function() {
    this._super();
    this.render('toolbar', {
      outlet: 'toolbar',
      controller: 'session'
    });
  },
  model: function(params) {
    var self = this;
    return this.store.find(
      'session',
      params.session_id
    ).then(function (session) {
      if (session.get('encrypted')) {
        // TODO: if no key provided, transition to asking for encryption key
        // page
        var access_key = params.access_key;
        if (access_key !== undefined) {
          // convert URL safe base64 back to normal base64
          access_key = normalizeURLSafeBase64(access_key);
          session.set('accessKey', access_key);
          self.transitionTo('session', session);
        }
        // TODO: validate AES key
        return session;
      }
    });
  }
});
