import Ember from 'ember';
import app from '../app';

export default Ember.Controller.extend({
  modelChanged: function() {
    // TODO: unsubscribe
    app.pubnub.subscribe({
        channel: this.get('model.id'),
        message: function(message){
          /*
          var modelName = 'break';
          this.store.push(
            modelName,
            this.store.normalize(modelName, message[modelName])
          );*/
          this.store.find('break', message['break']['id']).then(function (break_) {
            return break_.get('file');
          }).then(function (file) {
            console.log('File loaded!', file);
          });
        }.bind(this)
    });
  }.observes('model'),

  lastBreakChanged: function() {
    var lastBreak = this.get('model.lastBreak').then(function (break_) {
      var lineno = break_.get('lineno');
      var style = document.getElementById('global-style');
      console.log('!!! lineno', lineno);
      /* Notice: this is a little bit hacky, it's hard (or slow) to modify a
      line span in Ember JS, so we insert a global style here
      */
      if (style.sheet.rules.length) {
        style.sheet.deleteRule(0);
      }
      var rule = (
      '#line-%@ { ' +
      '  background-color: green;' +
      '  width: 100%;' +
      '  display: inline-block;' +
      '}').fmt(lineno)
      style.sheet.insertRule(rule, 0);
      //style.sheet.insertRule('body { background-color: red; }'.fmt(lineno), 0);
      //Ember.$('' + lineno).addClass('line-highlight');
    });
  }.observes('model.lastBreak'),

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
