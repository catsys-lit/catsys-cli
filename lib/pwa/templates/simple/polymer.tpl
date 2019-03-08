{
  "entrypoint": "index.html",
  "shell": "src/{{APP_TAG}}-app.js",
  "sources": [
    "images/**/*"
  ],
  "extraDependencies": [
    "manifest.json",
    "node_modules/@webcomponents/webcomponentsjs/**"
  ],
  "builds": [
    {
      "name": "esm-bundled",
      "browserCapabilities": [
        "es2015",
        "modules"
      ],
      "js": {
        "minify": true
      },
      "css": {
        "minify": true
      },
      "html": {
        "minify": true
      },
      "bundle": true,
      "addServiceWorker": true
    },
    {
      "name": "es6-bundled",
      "browserCapabilities": [
        "es2015"
      ],
      "js": {
        "compile": "es2015",
        "minify": true,
        "transformModulesToAmd": true
      },
      "css": {
        "minify": true
      },
      "html": {
        "minify": true
      },
      "bundle": true,
      "addServiceWorker": true
    },
    {
      "name": "es5-bundled",
      "js": {
        "compile": "es5",
        "minify": true,
        "transformModulesToAmd": true
      },
      "css": {
        "minify": true
      },
      "html": {
        "minify": true
      },
      "bundle": true,
      "addServiceWorker": true
    }
  ],
  "moduleResolution": "node",
  "npm": true
}
