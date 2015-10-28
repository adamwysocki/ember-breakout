import Ember from 'ember';

export default Ember.Service.extend({
  _paddle: [0, 0, 0, 0], // x, y, height, width
  reportPaddle: function(x, y, height, width) {
    const paddle = [x, y, height, width];
    this.set('_paddle', paddle);
    return;
  },
  collidesWithPaddle: function(ballX, ballY, ballRadius) {
    let returnValue   = false;
    const paddle      = this.get('_paddle');

    if( (ballX > paddle[0]) && (ballX < paddle[0] + paddle[3]) ) {
      if( (ballY + ballRadius >= paddle[1]) && (ballY - ballRadius <= paddle[1] + paddle[2])) {
        returnValue = true;
      }
    }

    return returnValue;
  }
});
