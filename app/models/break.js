import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
  session: DS.belongsTo('session'),
  file: DS.belongsTo('file', { async: true }),
  lineno: DS.attr('number'),
  local_vars: DS.attr(),

  // local vars as an array
  localVarsArray: Ember.computed('local_vars', function () {
    var arr = [];
    var localVars = this.get('local_vars');
    for(var key in localVars) {
        arr.push({key: key, value: localVars[key]});
    }
    return arr;
  })
});
