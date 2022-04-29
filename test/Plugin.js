const {
  declare
} = require('@babel/helper-plugin-utils');
const {
  join
} = require('path');

const state = Object.create(null)
const has = false;

function winPath(path) {
  return path.replace(/\\/g, '/');
}

function normalizeCustomName(originCustomName) {
  // If set to a string, treat it as a JavaScript source file path.
  if (typeof originCustomName === 'string') {
    const customNameExports = require(originCustomName);
    return typeof customNameExports === 'function' ? customNameExports : customNameExports.default;
  }

  return originCustomName;
}

function formatOptions(methodName, path, state) {
  let {
    customStyleName,
    libraryDirectory,
    libraryName,
    customName,
    fileName = '',
    runtimeStyleMap,
    camel2UnderlineComponentName,
    camel2DashComponentName
  } = state.opts;
  // if(!state[methodName])

  if(!libraryName) {
    console.error(`libraryName ${libraryName} no define, please check!`);
    return
  }

  console.log('methodName', methodName)
  libraryDirectory = typeof libraryDirectory === 'undefined' ? 'lib' : libraryDirectory;
  customName = normalizeCustomName(customName);
  customStyleName = normalizeCustomName(customStyleName);
  camel2DashComponentName =
      typeof camel2DashComponentName === 'undefined' ? true : camel2DashComponentName;

  const transformedMethodName = camel2UnderlineComponentName
        ? transCamel(methodName, '_')
        : this.camel2DashComponentName
        ? transCamel(methodName, '-')
        : methodName;

  const file = (path && path.hub && path.hub.file) || (state && state.file);
  let stylePath;
  if (customStyleName) {
    stylePath = winPath(customStyleName(transformedMethodName, file));

  } else {
    stylePath = winPath(
      customName ?
      customName(transformedMethodName, file) :
      join(libraryName, libraryDirectory, transformedMethodName, fileName)
    );
  }

  if(!state['runtimeStyleMap']) {
    Object.keys(runtimeStyleMap).forEach(v => {
      const { style } = runtimeStyleMap[v];
      runtimeStyleMap[v].style = style(stylePath, file);
    })
    state['runtimeStyleMap'] = runtimeStyleMap
  }

  return {
    runtimeStyleMap: state['runtimeStyleMap']
  }
}

const autoTrackPlugin = declare((api, options, dirname) => {
  // api.assertVersion(7);

  const Program = {
    ImportDeclaration(path, state) {
      console.log(path.node, state.opts);
      const {} = formatOptions('', path, state)

    }
  }

  const ret = {
    visitor: Program
  }

  return ret
});

module.exports = autoTrackPlugin;
