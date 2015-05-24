import Ember from 'ember';

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
    return this.store.find(
      'session',
      params.session_id
    ).then(function (session) {
      if (session.get('encrypted')) {
        // TODO: if no key provided, transition to asking for encryption key
        // page
        var aes_key = params.aes_key;
        // convert URL safe base64 back to normal base64
        aes_key = aes_key.replace(/_/g, '/');
        aes_key = aes_key.replace(/-/g, '+');
        session.set('aesKey', aes_key);
        // TODO: validate AES key
        return session;
      }
    });
  }
});
