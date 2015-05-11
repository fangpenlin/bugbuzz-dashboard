import Ember from 'ember';
import DS from 'ember-data';
import app from '../app';

export default Ember.Controller.extend({
  modelChanged: function() {
    // TODO: unsubscribe
    app.pubnub.subscribe({
        channel: this.get('model.id'),
        message: function(message){
          console.log(message)
          this.store.find('break', message['break']['id']).then(function (break_) {
            return break_.get('file');
          }).then(function (file) {
            console.log('File loaded!', file);
          });
        }.bind(this)
    });
  }.observes('model'),

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
