import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

export default Router.map(function() {
  this.route('session', { path: '/sessions/:session_id' }, function() {});
  this.route('file', function() {});
  this.route('break', function() {});
});
