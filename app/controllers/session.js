import Ember from 'ember';
import app from '../app';

export default Ember.Controller.extend({
  modelChanged: function() {
    // TODO: unsubscribe
    app.pubnub.subscribe({
        channel: this.get('model.id'),
        message: function(message){
          if ('file' in message) {
            this.store.push('file', this.store.normalize('file', message['file']));
          }
          if ('break' in message) {
            this.store.push('break', this.store.normalize('break', message['break']));
          }
        }.bind(this)
    });
  }.observes('model'),

  lastBreakChanged: function() {
    this.get('model.lastBreak').then(function () {
      Ember.run.scheduleOnce('afterRender', this, this.afterRenderEvent);
    }.bind(this));
  }.observes('model.lastBreak'),

  lastFileChanged: function () {
    this.get('model.lastFile').then(function () {
      Ember.run.scheduleOnce('afterRender', this, this.afterRenderEvent);
    }.bind(this));
  }.observes('model.lastFile'),

  afterRenderEvent: function () {
    $('.line-highlight').removeClass('line-highlight');
    var lineno = this.get('model.lastBreak').get('lineno');
    var currentLine = $('#line-%@'.fmt(lineno));
    if (!currentLine.length) {
      return;
    }
    currentLine.addClass('line-highlight');
    $('html, body').animate({
        scrollTop: currentLine.offset().top - ($(window).height() / 2)
    }, 500);
  },

  actions: {
    returnFunction: function(){
      this.get('model').returnFunc();
    },
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
