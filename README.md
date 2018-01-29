# angular-1x-component-gen
CLI utility to generate Angular 1.5+ components

## Install
```
npm install -g
```

## Set config path
Copy ng-1x-cmp-gen.config to a location of your choosing and modify as you wish. Then run:
```
ng-1x-cmp-gen -s [path]
```

## Generate components
```
ng-1x-cmp-gen -g [example-component-name]
```

Will output 3 placeholder files:
* .js for the component definition with controller
* .scss stylesheet
* .html component template

To customize output, files in the template folder can be edited.
