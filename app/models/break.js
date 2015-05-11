import DS from 'ember-data';

export default DS.Model.extend({
  session: DS.belongsTo('session'),
  file: DS.belongsTo('file', { async: true }),
  lineno: DS.attr('number')
});
