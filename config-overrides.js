// eslint-disable-next-line no-undef
module.exports = function override(config) {
  const lessRule = {
    test: /\.less$/,
    use: ['style-loader', 'css-loader', 'less-loader'],
  };
  config.module.rules.push(lessRule);
  return config;
};
