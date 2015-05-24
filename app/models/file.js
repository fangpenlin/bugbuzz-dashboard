import DS from 'ember-data';
import { decrypt_with_b64_as_string } from '../utils/encryption';

export default DS.Model.extend({
  breaks: DS.hasMany('break'),
  session: DS.belongsTo('session'),
  filename: DS.attr('string'),
  content: DS.attr('string'),
  aes_iv: DS.attr('string'),
  
  source_code: function() {
    // FIXME:
    var decryptedStr = decrypt_with_b64_as_string(
      'Dk0ieYHnmNbjOoN/Q17I//+c8oEfAbGIlNTBz3YByM4=',
      this.get('aes_iv'),
      this.get('content')
    );

    return decryptedStr;
  }.property('content')
});
