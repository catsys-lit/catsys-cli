![Catsys CLI](catsys.png)
# Catsys CLI

![Node](https://img.shields.io/badge/node-%3E%3D%208.x-brightgreen.svg)
![Gulp](https://img.shields.io/badge/task%20manager-gulp-orange.svg)
![BrowserSync](https://img.shields.io/badge/DevelopMode-BrowserSync-blue.svg)

A CLI useful for Lit Elements

## Getting Started

- `catsys component:create <component-tag>`: Creates a WebComponent based in lit-element
- `catsys component:serve`: Deploys in developing mode your component.
- `catsys component:test`: Runs the unit tests in the component
- `catsys app:create <name>`: Creates a PWA boilerplate (it is not necessary -app)
- `catsys app:serve [--static, -s]`: Deploys static files ES5 compatibility high
- `catsys app:serve [--develop, -d]`: Deploys the current code in src
- `catsys app:component <component-name>`: Creates a WebComponent based in lit-element light for app
- `catsys app:page <page-name>`: Creates a page with redux connection. Also, provides a new property `_[page_name]State` in your app shell ready to use.

**`app:serve` is develop mode [dafault]**
### Prerequisites

You need to have installed > NodeJS 8.x and NPM, Yarn is optional.
Also requires install polymer

```
npm install --global polymer-cli
```

### Installing

Only clone the repository and install the dependencies.

```
npm i
```

And that's all, you can use the repository in yout local environment

```
npm link
```

Maybe you require generate a symbolic link, you can the command before for that.

## Built With ❤

* [NodeJS](https://nodejs.org/en/) - The technology used
* [Gulp](https://gulpjs.com/) - Task Management
* [BrowserSync](https://www.browsersync.io/) - Used to refresh the browser

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/alfonsorios96/catsys-cli/CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/alfonsorios96/catsys-cli/tags). 

## Authors

* **Alfonso Ríos** - *Initial work* - [Alfonso](https://github.com/alfonsorios96)

See also the list of [contributors](https://github.com/alfonsorios96/catsys-cli/CONTRIBUTORS.md) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Hat tip to anyone whose code was used
* Inspiration
* etc
