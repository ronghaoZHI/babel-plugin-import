const { transformFileSync, transform } = require('@babel/core');
const { join } = require('path');
const { readdirSync, readFileSync, writeFileSync } = require('fs');
const plugin = require('../lib/index');
const autoTrackPlugin = require('./Plugin');

const fixturesDir = join(__dirname, 'fixtures');
// let fixtures = readdirSync(fixturesDir);
const caseName = 'custom-style-name';
const fixtureDir = join(fixturesDir, caseName);
const actualFile = join(fixtureDir, 'actual.js');

const pluginWithOpts = [
  plugin,
  {
    libraryName: 'element-ui',
    libraryDirectory: 'lib',
    style: name => `element-ui/lib/${name}/style/`,
  },
  'zz'
];

const actual = transformFileSync(actualFile, {
  presets: ['@babel/preset-react'],
  plugins: [
    pluginWithOpts,
    // [
    //   autoTrackPlugin,
    //   {
    //     libraryName: 'element-ui',
    //     libraryDirectory: 'lib',
    //     runtimeStyleMap: {
    //       '_var_theme_zz': {
    //         reg: () => !window.navigator.userAgent.includes('zhaoliangji'),
    //         style: name => `element-ui/lib/theme-light/${name}/style/index`,
    //       },
    //       '_var_theme_zlj': {
    //         reg: () => window.navigator.userAgent.includes('zhaoliangji'),
    //         style: name => `element-ui/lib/theme-light/${name}/style/zlj`,
    //       },
    //       default: {
    //         reg: () => !window.navigator.userAgent.includes('zhaoliangji'),
    //         style: name => `element-ui/lib/theme-light/${name}/style/index`
    //       }
    //     }
    //   }
    // ],
  ],
}).code;

console.log(actual)

writeFileSync(join(__dirname, 'test.out.js'), actual, 'utf-8')
