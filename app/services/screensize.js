import Ember from 'ember';

const {
  computed
} = Ember;

export default Ember.Service.extend({
  _height: 500,
  _width: 800,

  readValues: function() {

  }.on('init'),

  height: computed('_height', function() {
    return this.get('_height');
  }),

  width: computed('_width', function() {
    return this.get('_width');
  })

});
