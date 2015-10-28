import Ember from 'ember';

export default Ember.Service.extend({
  muted: false,
  hitWall: function() {
    if(!this.get('muted')) {
      const sound = new Audio('/sounds/Beep.mp3');
      sound.play();
    }
  },
  hitPaddle: function() {
    if(!this.get('muted')) {
      const sound = new Audio('/sounds/PaddleBeep.mp3');
      sound.play();
    }
  },
  sound: function(on) {
    this.set('muted', on);
  }
});
