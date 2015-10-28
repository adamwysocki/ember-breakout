import Ember from 'ember';

const {
  computed,
  run,
  inject
} = Ember;

const BALL_SPEED        = 3;
const BALL_SIZE         = 5;
const LEFT_BORDER       = 0;
const TOP_BORDER        = 0;
const SECOND            = 1000;
const FRAMES_PER_SECOND = 30;

export default Ember.Component.extend({
  gameState: 0,
  collision: inject.service(),
  screensize: inject.service(),
  sounds: inject.service(),
  screenWidth: computed.alias('screensize.width'),
  screenHeight: computed.alias('screensize.height'),
  movingRight: true,
  movingDown: false,
  _cx: 100,
  _cy: 520,
  tagName: 'circle',
  scale: BALL_SIZE,
  attributeBindings: ['cx', 'cy', 'r', 'fill'],
  classNames: ['breakout-board'],
  cx: computed( '_cx', function() {
    return this.get('_cx');
  }),
  cy: computed( '_cy', function() {
    return this.get('_cy');
  }),
  r: computed( 'scale', function() {
    return BALL_SIZE;
  }),
  fill: computed( 'scale', function() {
    return 'white';
  }),
  moveBall: function(){

    if(this.get('gameState') === 0) {
      return;
    }

    let [newX, newY] = [0, 0];

    if(this.get('movingRight')) {
      newX = this.get('_cx') + (1  * BALL_SPEED);
    } else {
      newX = this.get('_cx') - (1  * BALL_SPEED);
    }

    if(this.get('movingDown')) {
      newY = this.get('_cy') + (1  * BALL_SPEED);
    } else {
      newY = this.get('_cy') - (1  * BALL_SPEED);
    }

    /*
    console.log('newX:',newX,' newY:',newY);
    console.log('movingDown:',this.get('movingDown'),' movingRight:',this.get('movingRight'));
    console.log('screenHeight:',this.get('screenHeight'),' screenWidth:',this.get('screenWidth'));
    */

    this.set('_cx', newX);
    this.set('_cy', newY);

    if(this.get('collision').collidesWithPaddle(newX, newY, BALL_SIZE)) {
      this.get('sounds').hitPaddle();
      this.set('movingDown', false);
    }

    if(newX > this.get('screenWidth') - BALL_SIZE) {
      this.get('sounds').hitWall();
      this.set('movingRight', false);
    } else if(newX < LEFT_BORDER + BALL_SIZE) {
      this.get('sounds').hitWall();
      this.set('movingRight', true);
    }

    if(newY > this.get('screenHeight') - BALL_SIZE) {
      this.get('sounds').hitWall();
      this.set('movingDown', false);
    } else if(newY < TOP_BORDER + BALL_SIZE) {
      this.get('sounds').hitWall();
      this.set('movingDown', true);
    }

    run.later(()=>{
      this.moveBall();
    }, SECOND / FRAMES_PER_SECOND);
  },
  didUpdate: function() {
    if(this.get('gameState') === 1) {
      this.moveBall();
    }
  }
});
