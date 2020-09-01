const { func } = require("prop-types");

function init() {}

function log(error) {
  console.error(error);
}

export default {
  init,
  log,
};
