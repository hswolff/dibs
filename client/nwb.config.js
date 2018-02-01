/* eslint-env node */

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  type: 'react-app',
  babel: {
    plugins: [
      [
        'emotion',
        isProduction
          ? { hoist: true, extractStatic: true }
          : { sourceMap: true, autoLabel: true },
      ],
    ],
  },
};
