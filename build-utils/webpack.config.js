const commonWebpack = require("./webpack.common.js");
const { merge } = require("webpack-merge");

const getAddons = (addonsArgs) => {
  const addons = Array.isArray(addonsArgs) ? addonsArgs : [addonsArgs];
  return addons
    .filter(Boolean)
    .map((name) => require(`./addons/webpack.${name}.js`));
};

module.exports = ({ env, addon }) => {
  const envConfig = require(`./webpack.${env}.js`);

  return merge(commonWebpack, envConfig, ...getAddons(addon));
};
