import Ember from 'ember';

const {
  computed
} = Ember;

export default Ember.Component.extend({
  tagName: 'text',
  _x: 200,
  _y: 300,
  attributeBindings: ['x', 'y'],
  x: computed( '_x', function() {
    return this.get('x');
  }),
  y: computed( '_y', function() {
    return this.get('y');
  })
});
