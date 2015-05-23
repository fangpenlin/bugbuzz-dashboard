import DS from 'ember-data';
import { b64decode } from '../utils/base64';

export default DS.Model.extend({
  breaks: DS.hasMany('break'),
  session: DS.belongsTo('session'),
  filename: DS.attr('string'),
  content: DS.attr('string'),
  
  source_code: function() {
    return b64decode(this.get('content'));
  }.property('content')
});
