import Ember from 'ember';

const {
  computed,
  $,
  inject,
  run
} = Ember;

const RIGHT_ARROW_KEY   = 39;
const LEFT_ARROW_KEY    = 37;

const PADDLE_WIDTH      = 100;
const PADDLE_HEIGHT     = 10;
const PADDLE_SPEED      = 10;
const LEFT              = 0;
const RIGHT             = 1;
const SECOND            = 1000;
const FRAMES_PER_SECOND = 60;


export default Ember.Component.extend({
  screensize: inject.service(),
  collision: inject.service(),
  screenWidth: computed.alias('screensize.width'),
  screenHeight: computed.alias('screensize.height'),
  moving: false,
  direction: LEFT,
  _x: 300,
  _y: 480,
  _width: PADDLE_WIDTH,
  _height: PADDLE_HEIGHT,
  tagName: 'rect',
  fill: 'white',
  attributeBindings: ['x', 'y', 'height', 'width', 'fill'],
  classNames: ['breakout-paddle'],
  x: computed( '_x', function() {
    return this.get('_x');
  }),
  y: computed( '_y', function() {
    return this.get('_y');
  }),
  height: computed( '_height', function() {
    return this.get('_height');
  }),
  width: computed( '_width', function() {
    return this.get('_width');
  }),
  stopPaddle: function() {
    this.set('moving', false);
  },
  updatePaddle: function() {
    if(this.get('moving') && this.get('direction') === LEFT) {
      if((this.get('_x') - PADDLE_SPEED) >= 0) {
        this.decrementProperty('_x', PADDLE_SPEED);
      }
    } else if(this.get('moving') && this.get('direction') === RIGHT) {
      if( (this.get('_x') + PADDLE_SPEED + PADDLE_WIDTH) <= this.get('screenWidth')) {
       this.incrementProperty('_x', PADDLE_SPEED);
     }
    }

    this.get('collision').reportPaddle(this.get('_x'), this.get('_y'), 
                           this.get('_height'), this.get('_width'));

    if(this.get('moving')) {
      run.later(()=>{
        this.updatePaddle();
      }, SECOND / FRAMES_PER_SECOND);
    }
  },
  movePaddle: function(direction) {

    if(this.get('moving')) {
      return;
    }

    if(direction.keyCode === LEFT_ARROW_KEY) {
      this.set('moving', true);
      this.set('direction', LEFT);
    } else if(direction.keyCode === RIGHT_ARROW_KEY) {
      this.set('moving', true);
      this.set('direction', RIGHT);
    }

    if(this.get('moving')) {
      run.later(()=>{
        this.updatePaddle();
      }, SECOND / FRAMES_PER_SECOND);
    }
  },
  didInsertElement: function() {
    $(document).on('keypress', Ember.run.bind(this, this.movePaddle));
    $(document).on('keydown', Ember.run.bind(this, this.movePaddle));
    $(document).on('keyup', Ember.run.bind(this, this.stopPaddle));
  }
});
