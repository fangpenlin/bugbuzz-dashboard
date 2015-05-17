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
    return this.store.find('session', params.session_id);
  }
});
