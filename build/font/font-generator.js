const webfontsGenerator = require('webfonts-generator');
const path = require('path');
const fs = require('fs');

const src = './src/sources';
const dist = './dist/sources';

webfontsGenerator({
  files: fs.readdirSync(path.join(src, 'icons'))
    .map(file => path.join(src, 'icons', file)),
  dest: path.join(dist, 'fonts'),
  fontName: 'icons',
  cssDest: path.join(dist, 'icon.css'),
  html: true,
  htmlDest: path.join(dist, 'preview.html'),
  baseClass: 'icon',
  cssFontsUrl: './fonts',
  types: ['eot', 'woff', 'ttf', 'svg'],
  cssTemplate: './build/font/css-template.hbs',
  fontHeight: 32,
  fixedWidth: true,
  fontWeight: '12px',
}, (error, result) => {
  if (error) console.error(error);
});
