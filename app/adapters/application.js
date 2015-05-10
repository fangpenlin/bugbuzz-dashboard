import DS from 'ember-data';
import config from '../config/environment';

// TODO: read from config
export default DS.RESTAdapter.extend({
    host: config.apiURL
});
