#!/usr/bin/env node

const camelCase = require('lodash.camelcase');
const upperFirst = require('lodash.upperfirst');
const Handlebars = require('handlebars');
const fs = require('file-system');

const cmpName = process.argv[2];
const cmpNameCamel = camelCase(cmpName);
const cmpNameCapital = upperFirst(cmpNameCamel);

const config = JSON.parse(fs.readFileSync('config.json', 'utf8'));

const context = {
  cmpName,
  cmpNameCamel,
  cmpNameCapital,
  config,
};

const fileNames = {
  js: `${cmpName}.js`,
  scss: `${cmpName}.scss`,
  html: `${cmpName}.component.html`,
};

console.log('Component name: ', cmpName);
console.log('Config: ', config);
console.log();

buildJsOutput();
buildScssOutput();
buildHtmlOutput();

console.log('Wrote: ');
Object.values(fileNames).forEach(function(fileName) {
  console.log(fileName);
});

function buildJsOutput() {
  const template = Handlebars.compile(fs.readFileSync('./templates/component.js.tmpl', 'utf8'));
  fs.writeFile(fileNames.js, template(context));
}

function buildScssOutput() {
  const template = Handlebars.compile(fs.readFileSync('./templates/component.scss.tmpl', 'utf8'));
  fs.writeFile(fileNames.scss, template(context));
}

function buildHtmlOutput() {
  const template = Handlebars.compile(fs.readFileSync('./templates/component.html.tmpl', 'utf8'));
  fs.writeFile(fileNames.html, template(context));
}
