import Ember from 'ember';

export default Ember.Route.extend({
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
