#!/usr/bin/env node

const SETTINGS_FILENAME = "settings.json";

const camelCase = require('lodash.camelcase');
const upperFirst = require('lodash.upperfirst');
const Handlebars = require('handlebars');
const fs = require('file-system');
const path = require('path');
const program = require('commander');

program
  .version('0.1.0')
  .option('-g, --generate [component name]', 'generate component files')
  .option('-s, --set-config [path]', 'set the config path')
  .parse(process.argv);

if (program.generate) {
  runGenerate(program.generate);
} else if (program.setConfig) {
  runSetConfig(program.setConfig);
} else {
  program.help();
}

function runGenerate(cmpName) {
  console.log("Generating component:", cmpName);

  const libSettings = JSON.parse(fs.readFileSync(path.join(__dirname, SETTINGS_FILENAME), 'utf8'));

  let configPath = libSettings.configPath;
  if (!fs.existsSync(configPath)) {
    console.log("WARN: Config path in settings.json does not exist");
    configPath = path.join(__dirname, "./ng-1x-cmp-gen.config");
  }
  console.log(`Using config: ${configPath}`);

  const genConfig = JSON.parse(fs.readFileSync(configPath, 'utf8'));

  const cmpNameCamel = camelCase(cmpName);
  const cmpNameCapital = upperFirst(cmpNameCamel);

  const context = {
    cmpName,
    cmpNameCamel,
    cmpNameCapital,
    config: genConfig,
  };

  const fileNames = {
    js: `${cmpName}.js`,
    scss: `${cmpName}.scss`,
    html: `${cmpName}.component.html`,
  };

  console.log('Config:', genConfig);
  console.log();

  buildJsOutput();
  buildScssOutput();
  buildHtmlOutput();

  console.log('Wrote:');
  Object.values(fileNames).forEach(function(fileName) {
    console.log(fileName);
  });

  function buildJsOutput() {
    const template = Handlebars.compile(fs.readFileSync(path.join(__dirname, '/templates/component.js.tmpl'), 'utf8'));
    fs.writeFile(fileNames.js, template(context));
  }

  function buildScssOutput() {
    const template = Handlebars.compile(fs.readFileSync(path.join(__dirname, '/templates/component.scss.tmpl'), 'utf8'));
    fs.writeFile(fileNames.scss, template(context));
  }

  function buildHtmlOutput() {
    const template = Handlebars.compile(fs.readFileSync(path.join(__dirname, '/templates/component.html.tmpl'), 'utf8'));
    fs.writeFile(fileNames.html, template(context));
  }
}

function runSetConfig(configPath) {
  console.log("Saving config path setting:", configPath);

  const libSettings = JSON.parse(fs.readFileSync(path.join(__dirname, SETTINGS_FILENAME), 'utf8'));
  libSettings.configPath = configPath;

  fs.writeFileSync(path.join(__dirname, SETTINGS_FILENAME), JSON.stringify(libSettings), 'utf8');
}
