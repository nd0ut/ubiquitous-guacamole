const flowRemoveTypes = require('flow-remove-types');

module.exports = {
  process: function(src, filename) {
    return flowRemoveTypes(src, { all: true }).toString();
  }
};
