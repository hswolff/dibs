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
              // seems to be broken and is not recommended.
              extractStatic: false,
              outputDir: '.emotion',
            }
          : {
              sourceMap: true,
              autoLabel: true,
              labelFormat: '[filename]--[local]',
            },
      ],
    ],
  },
  webpack: {
    define: {
      __API_URL__: JSON.stringify(process.env.API_URL),
    },
  },
};
