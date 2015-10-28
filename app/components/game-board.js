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
  reallyStartGame: function() {
    console.log('changing game state to running');
    this.set('gameState', RUNNING);
  },
  startGame: function() {
    run.later(()=>{
      this.reallyStartGame();
    }, 2000);
  },
  didInsertElement: function() {
    run.scheduleOnce('afterRender', this, 'startGame');
  }
});
