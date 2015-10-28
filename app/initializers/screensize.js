export function initialize(container, application) {
  application.inject('component', 'screensize', 'service:screensize');
}

export default {
  name: 'screensize',
  initialize: initialize
};
