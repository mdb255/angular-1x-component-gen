const os = require('os');
const fs = require('file-system');
const path = require('path');

const pluginDir = path.join(os.homedir(), ".ng-1x-cmp-gen");
const configFile = path.join(pluginDir, "config.json");

if (!fs.existsSync(pluginDir)) {
  fs.mkdirSync(pluginDir, "755");
}

fs.copyFileSync("config.json", configFile);
fs.chmodSync(configFile, "644");

console.log(`Created default config file: ${configFile}`);
