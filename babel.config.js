module.exports = {
  presets: [
    ['@babel/preset-env', {
      targets: {
        node: '4',
      },
      modules: 'commonjs',
    }],
  ],
  plugins: ['add-module-exports'],
};
