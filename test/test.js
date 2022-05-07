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
    runtimeThemeStyle: {
      defaultStyle: 'zzStyle',
      zzStyle: (name) => `${name}/style/index}`,
      zljStyle: (name) => `${name}/style/zlj}`,
      // hunterStyle: (name) => `${name}/style/zzHunter}`
    }
  },
  'zz-ui'
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
    // ],
  ],
}).code;

console.log(actual)

writeFileSync(join(__dirname, 'test.out.js'), actual, 'utf-8')
