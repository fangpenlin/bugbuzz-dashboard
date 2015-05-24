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
  resetController: function (controller, isExiting, transition) {
    if (isExiting) {
      controller.set('access_key', null);
    }
  },
  model: function(params) {
    var self = this;
    return this.store.find(
      'session',
      params.session_id
    );
  }
});
