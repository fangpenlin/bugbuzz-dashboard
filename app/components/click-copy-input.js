import Ember from 'ember';

export default Ember.Component.extend({
    click: function () {
        $(this.element).find('input').select();
        // TODO: implement copy
    }
});
