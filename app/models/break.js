import Ember from 'ember';
import DS from 'ember-data';
import { decrypt_with_b64_as_string } from '../utils/encryption';

export default DS.Model.extend({
  session: DS.belongsTo('session'),
  file: DS.belongsTo('file', { async: true }),
  lineno: DS.attr('number'),
  local_vars: DS.attr(),
  aes_iv: DS.attr('string'),

  // local vars as an array
  localVarsArray: Ember.computed(
    'local_vars',
    'aes_iv',
    'session.accessKey',
    function () {
      if (Ember.isNone(this.get('session.accessKey'))) {
        return [];
      }
      var decryptedStr = decrypt_with_b64_as_string(
        this.get('session.accessKey'),
        this.get('aes_iv'),
        this.get('local_vars')
      );

      var arr = [];
      var localVars = JSON.parse(decryptedStr);
      for(var key in localVars) {
          arr.push({key: key, value: localVars[key]});
      }
      return arr;
    }
  )
});
