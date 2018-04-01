/* eslint-env node */

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  type: 'react-app',
  babel: {
    plugins: [
      [
        'emotion',
        isProduction
          ? {
              hoist: true,
              extractStatic: true,
              outputDir: '.emotion',
            }
          : { sourceMap: true, autoLabel: true },
      ],
    ],
  },
};
