export function initialize(container, application ) {
  application.inject('components', 'sounds', 'service:sounds');
}

export default {
  name: 'sounds',
  initialize: initialize
};
