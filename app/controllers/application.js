import Ember from 'ember';

const {
  inject
} = Ember;

export default Ember.Controller.extend({
  score: 0,
  lives: 5,
  level: 1,
  sounds: inject.service(),
  soundMuted: false,
  actions: {
    toggleSound: function() {
      this.toggleProperty('soundMuted');
      this.get('sounds').sound(this.get('soundMuted'));
    }
  }
});
