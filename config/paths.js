

const path = require('path');
const fs = require('fs');
const getPublicUrlOrPath = require('react-dev-utils/getPublicUrlOrPath');

const glob = require('glob')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');

// Make sure any symlinks in the project folder are resolved:
// https://github.com/facebook/create-react-app/issues/637
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

// We use `PUBLIC_URL` environment variable or "homepage" field to infer
// "public path" at which the app is served.
// webpack needs to know it to put the right <script> hrefs into HTML even in
// single-page apps that may serve index.html for nested URLs like /todos/42.
// We can't use a relative path in HTML because we don't want to load something
// like /todos/42/static/js/bundle.7289d.js. We have to know the root.
const publicUrlOrPath = getPublicUrlOrPath(
  process.env.NODE_ENV === 'development',
  require(resolveApp('package.json')).homepage,
  process.env.PUBLIC_URL
);

const moduleFileExtensions = [
  'web.mjs',
  'mjs',
  'web.js',
  'js',
  'web.ts',
  'ts',
  'web.tsx',
  'tsx',
  'json',
  'web.jsx',
  'jsx',
];

// Resolve file paths in the same order as webpack
const resolveModule = (resolveFn, filePath) => {
  const extension = moduleFileExtensions.find(extension =>
    fs.existsSync(resolveFn(`${filePath}.${extension}`))
  );

  if (extension) {
    return resolveFn(`${filePath}.${extension}`);
  }

  return resolveFn(`${filePath}.js`);
};

const entries = {};
const chunks = [];
const pagesInSite = [];

function generatePage(webpackEnv) {
  const isEnvDevelopment = webpackEnv === 'development';
  glob.sync('src/pages/**/index.tsx').forEach((each) => {
    let chunk = each.split('src/pages/')[1].split('/index.tsx')[0];
    if (chunk === undefined) {
      return;
    }
    entries[chunk] = [];
    if (isEnvDevelopment) {
      entries[chunk] = [require.resolve('react-dev-utils/webpackHotDevClient')]
    }
    entries[chunk].push(resolveModule(resolveApp, `src/pages/${chunk}/index`))
    chunks.push(chunk);
    if (chunk.indexOf('/') !== -1) {
      chunk = chunk.split('/').join('_')
    }
    const filename = chunk + '.html';
    const htmlConfig = {
      filename,
      template: resolveApp(`public/index${isEnvDevelopment ? '.dev' : ''}.html`),
      hash: true,
      chunks: [chunk]
    }
    if (isEnvDevelopment) {
      htmlConfig.minify = {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      }
    }
    pagesInSite.push(new HtmlWebpackPlugin(htmlConfig),);
  });
}

function devRewrites() {
  return chunks.map(e => ({ from: new RegExp(`^\/${e}.html`), to: `/build/${e}.html` }))
}

// config after eject: we're in ./config/
module.exports = {
  generatePage,
  dotenv: resolveApp('.env'),
  appPath: resolveApp('.'),
  // Build folder. Point to project root templates folder
  appBuild: resolveApp('../templates'),
  appPublic: resolveApp('public'),
  appHtml: resolveApp('public/index.html'),
  appIndexJs: resolveModule(resolveApp, 'src/index'),
  appEntries: entries,
  pagesInSite,
  devRewrites: devRewrites(),
  mainIndex: resolveModule(resolveApp, 'src/pages/main/index'),
  presenterIndex: resolveModule(resolveApp, 'src/pages/presenter/index'),
  appPackageJson: resolveApp('package.json'),
  appSrc: resolveApp('src'),
  appTsConfig: resolveApp('tsconfig.json'),
  appJsConfig: resolveApp('jsconfig.json'),
  yarnLockFile: resolveApp('yarn.lock'),
  testsSetup: resolveModule(resolveApp, 'src/setupTests'),
  proxySetup: resolveApp('src/setupProxy.js'),
  appNodeModules: resolveApp('node_modules'),
  publicUrlOrPath,
};



module.exports.moduleFileExtensions = moduleFileExtensions;
