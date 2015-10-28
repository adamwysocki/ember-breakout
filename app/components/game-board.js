import Ember from 'ember';

const {
  computed,
  inject,
  run
} = Ember;

const STOPPED = 0;
const RUNNING = 1;

export default Ember.Component.extend({
  gameState: STOPPED,
  tagName: 'svg',
  scale: 40,
  screensize: inject.service(),
  _width: computed.alias('screensize.width'),
  _height: computed.alias('screensize.height'),
  attributeBindings: ['width', 'height'],
  classNames: ['breakout-board'],
  width: computed( 'scale', function() {
    return this.get('_width');
  }),
  height: computed( 'scale', function() {
    return this.get('_height');
  }),
  startGame: function() {
    this.set('gameState', RUNNING);
  },
  didInsertElement: function() {
    run.scheduleOnce('afterRender', this, 'startGame');
  }
});
