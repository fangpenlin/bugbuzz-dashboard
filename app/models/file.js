import DS from 'ember-data';
import { base64DecToArr, UTF8ArrToStr } from '../utils/base64';

export default DS.Model.extend({
  breaks: DS.hasMany('break'),
  session: DS.belongsTo('session'),
  filename: DS.attr('string'),
  content: DS.attr('string'),
  aes_iv: DS.attr('string'),
  
  source_code: function() {
    // FIXME:
    var key = base64DecToArr('Dk0ieYHnmNbjOoN/Q17I//+c8oEfAbGIlNTBz3YByM4=');
    var iv = base64DecToArr(this.get('aes_iv'));
    var encrypted = base64DecToArr(this.get('content'));
    var decrypted = Crypto.pkcs_unpad(
      Crypto.decrypt_aes_cbc(encrypted.buffer, key.buffer, iv.buffer)
    );
    var decryptedStr = UTF8ArrToStr(new Uint8Array(decrypted));

    return decryptedStr;
  }.property('content')
});
