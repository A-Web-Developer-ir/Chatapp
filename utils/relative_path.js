const path = require("path");
const basePath = path.resolve(path.dirname(require.main.filename));

module.exports.path = path;
module.exports.relativePath = (...paths) => {
  path.join(basePath, ...paths);
};
