import DS from 'ember-data';

// TODO: read from config
export default DS.RESTAdapter.extend({
    host: 'http://127.0.0.1:9090'
});
