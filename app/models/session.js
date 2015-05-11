import Ember from 'ember';
import DS from 'ember-data';
import config from '../config/environment';

export default DS.Model.extend({
  files: DS.hasMany('file'),
  breaks: DS.hasMany('break'),
  href: DS.attr('string'),

  next: function () {
    this._command('next');
  },
  step: function () {
    this._command('step');
  },
  resume: function () {
    this._command('continue');
  },

  _command: function (type) {
    Ember.$.ajax({
      type: 'POST',
      url: config.apiURL + this.get('href') + '/actions/' + type
    });
  }
});
