/**
 * Workaround to Storybook Knob. It is useful when you need to update the knob value
 */
export default (name, value) => {
  window.__STORYBOOK_ADDONS.channel.emit('storybookjs/knobs/change', {
    name,
    value,
  });
};
