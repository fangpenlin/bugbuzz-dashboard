import Ember from 'ember';

export default Ember.TextField.extend({
    classNames: ['click-copy-input'],
    click: function () {
        $(this.element).select();
        // TODO: implement copy
    }
});
