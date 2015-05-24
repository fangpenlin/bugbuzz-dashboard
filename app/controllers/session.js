import Ember from 'ember';
import app from '../app';
import { normalizeURLSafeBase64 } from '../utils/base64';

export default Ember.Controller.extend({
  modelChanged: function() {
    // TODO: unsubscribe
    app.pubnub.subscribe({
        channel: this.get('model.dashboard_channel'),
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
      // TODO: avoid delay issue, cancel outdate schedule
      Ember.run.scheduleOnce('afterRender', this, this.afterRenderEvent);
    }.bind(this));
  }.observes('model.lastBreak'),

  lastFileChanged: function () {
    this.get('model.lastFile').then(function () {
      // TODO: avoid delay issue, cancel outdate schedule
      Ember.run.scheduleOnce('afterRender', this, this.afterRenderEvent);
    }.bind(this));
  }.observes('model.lastFile'),

  afterRenderEvent: function () {
    Ember.$('.line-highlight').removeClass('line-highlight');
    var lineno = this.get('model.lastBreak').get('lineno');
    var currentLine = Ember.$('#line-%@'.fmt(lineno));
    if (!currentLine.length) {
      return;
    }
    currentLine.addClass('line-highlight');
    Ember.$('html, body').animate({
        scrollTop: currentLine.offset().top - (Ember.$(window).height() / 2)
    }, 500);
  },

  needsAccessKeyChanged: function () {
    var needsAccessKey = this.get('model.needsAccessKey');
    if (!needsAccessKey) {
      return;
    }
    Ember.run.scheduleOnce('afterRender', this, function () {
      Ember.$('#session-access-key-modal').modal();
    });
  }.observes('model.needsAccessKey'),

  inputAccessKeyChanged: function () {
    this.set('accessKeyError', null);
  }.observes('inputAccessKey'),

  accessKeyError: null,

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
    },
    decrypt: function(){
      var inputAccessKey = normalizeURLSafeBase64(this.get('inputAccessKey'));
      if (Ember.isBlank(inputAccessKey)) {
        this.set('accessKeyError', 'Cannot be blank');
        console.log('Blank access key');
        return;
      }
      if (!this.get('model').validateAccessKey(inputAccessKey)) {
        this.set('accessKeyError', 'Bad access key');
        console.log('Bad access key');
        return;
      }
      this.get('model').set('accessKey', inputAccessKey);
      Ember.$('#session-access-key-modal').modal('hide');
    }
  }
  });
