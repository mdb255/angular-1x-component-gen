# angular-1x-component-gen
CLI utility to generate Angular 1.5+ components

## Install
### Mac / Linux
```
sudo npm install -g -user $USER
```
### Windows
```
npm install -g
```

## Update config
Locate ~/.ng-1x-cmp-gen/config.json and modify as you wish to customize output.

## Generate components
```
ng-1x-cmp-gen -g [example-component-name]
```

Will create a folder containing 3 placeholder files:
* .js for the component definition with controller
* .scss stylesheet
* .html component template

To further customize output, files in the template folder can be edited.
