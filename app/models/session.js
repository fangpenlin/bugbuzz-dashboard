import Ember from 'ember';
import DS from 'ember-data';
import config from '../config/environment';
import { decrypt_with_b64_as_string } from '../utils/encryption';

export default DS.Model.extend({
  files: DS.hasMany('file',{ async:true }),
  breaks: DS.hasMany('break',{ async:true }),
  href: DS.attr('string'),
  dashboard_channel: DS.attr('string'),
  encrypted: DS.attr('boolean'),
  aes_iv: DS.attr('string'),
  validation_code: DS.attr('string'),
  encrypted_code: DS.attr('string'),

  accessKey: null,

  // do we need password to decrypt this session?
  needsAccessKey: Ember.computed('encrypted', 'accessKey', function (argument) {
    return this.get('encrypted') && Ember.isNone(this.get('accessKey'));
  }),

  // validate given access key
  validateAccessKey: function (accessKey) {
    var decryptedStr = decrypt_with_b64_as_string(
      accessKey,
      this.get('aes_iv'),
      this.get('encrypted_code')
    );
    return decryptedStr === this.get('validation_code');
  },

  accessKeyChanged: function () {
    // update current code as we just set access key
    this.set('currentCode', this.get('lastFile.source_code'));
  }.observes('accessKey'),

  lastBreak: Ember.computed('breaks', function () {
    var promise = this.get('breaks').then(function (breaks) {
      // TODO: what if no break available?
      return breaks.objectAt(breaks.length - 1);
    });
    return  DS.PromiseObject.create({ promise: promise });
  }),

  lastFile: Ember.computed('lastBreak', function () {
    var promise = this.get('lastBreak').then(function (break_) {
      if (!break_) {
        return break_;
      }
      return break_.get('file').then(function (file) {
        this.set('currentCode', file.get('source_code'));
        return file;
      }.bind(this));
    }.bind(this));
    return DS.PromiseObject.create({ promise: promise });
  }),

  currentCode: null,

  returnFunc: function () {
    this._command('return');
  },
  next: function () {
    this._command('next');
  },
  step: function () {
    this._command('step');
  },
  resume: function () {
    this._command('continue');
  },

  _command: function (type) {
    Ember.$.ajax({
      type: 'POST',
      url: config.apiURL + this.get('href') + '/actions/' + type
    });
  }
});
