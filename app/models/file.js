import DS from 'ember-data';

export default DS.Model.extend({
  breaks: DS.hasMany('break'),
  session: DS.belongsTo('session'),
  filename: DS.attr('string'),
  content: DS.attr('string')
});
