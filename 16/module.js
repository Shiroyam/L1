const moment = require("moment");

module.exports = function formatDate(date) {
  return moment(date).locale("ru").format("MMMM Do YYYY, h:mm:ss a");
};
