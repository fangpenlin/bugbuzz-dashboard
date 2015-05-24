/* global Crypto */
import Ember from 'ember';
import DS from 'ember-data';
import { base64DecToArr, UTF8ArrToStr } from '../utils/base64';

export default DS.Model.extend({
  session: DS.belongsTo('session'),
  file: DS.belongsTo('file', { async: true }),
  lineno: DS.attr('number'),
  local_vars: DS.attr(),
  aes_iv: DS.attr('string'),

  // local vars as an array
  localVarsArray: Ember.computed('local_vars', 'aes_iv', function () {
    // FIXME:
    var key = base64DecToArr('Dk0ieYHnmNbjOoN/Q17I//+c8oEfAbGIlNTBz3YByM4=');
    var iv = base64DecToArr(this.get('aes_iv'));
    var encrypted = base64DecToArr(this.get('local_vars'));
    var decrypted = Crypto.pkcs_unpad(
      Crypto.decrypt_aes_cbc(encrypted.buffer, key.buffer, iv.buffer)
    );
    var decryptedStr = UTF8ArrToStr(new Uint8Array(decrypted));

    var arr = [];
    var localVars = JSON.parse(decryptedStr);
    for(var key in localVars) {
        arr.push({key: key, value: localVars[key]});
    }
    return arr;
  })
});
