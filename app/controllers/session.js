import Ember from 'ember';
import DS from 'ember-data';

export default Ember.Controller.extend({
 actions: {
    next: function(){
      this.get('model').next();
    },
    step: function(){
      this.get('model').step();
    },
    resume: function(){
      this.get('model').resume();
    }
  }
});
