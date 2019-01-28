# Bottom Time - Web Front-End
A React-based front-end for the Bottom Time application.

Component | Status
-|-
Master Build | [![CircleCI](https://circleci.com/gh/ChrisCarleton/BottomTime-Web/tree/master.svg?style=svg&circle-token=0da34d6d5ac574445b77bfbb8904220521684aa4)](https://circleci.com/gh/ChrisCarleton/BottomTime-Web/tree/master)
Production Build | [![CircleCI](https://circleci.com/gh/ChrisCarleton/BottomTime-Web/tree/prod.svg?style=svg&circle-token=0da34d6d5ac574445b77bfbb8904220521684aa4)](https://circleci.com/gh/ChrisCarleton/BottomTime-Web/tree/prod)
Dependencies | [![dependencies Status](https://david-dm.org/ChrisCarleton/BottomTime-Web/status.svg)](https://david-dm.org/ChrisCarleton/BottomTime-Web)
Dev Dependencies | [![devDependencies Status](https://david-dm.org/ChrisCarleton/BottomTime-Web/dev-status.svg)](https://david-dm.org/ChrisCarleton/BottomTime-Web?type=dev)

## Building and Running Locally
### Prerequisites
This project is built, tested, and packaged using the [Gulp CLI](https://www.npmjs.com/package/gulp-cli).

```
npm install -g gulp-cli
```

It is also dependent on the [Bottom Time Core](https://github.com/ChrisCarleton/BottomTime-Core) service to
provide an API backend. By default, this will need to be running locally at `http://localhost:29201/`, but
you can override this by setting the `BT_API_URL` environment variable to your desired endpoint URL. See
[Serving Locally](#serving-locally) below.

To run the core service locally, see the README for that project in the repo linked to above.

### Testing
Linting and running tests can be done with the two following commands, respectively.
```
gulp lint
```

```
gulp test
```

Both are required to succeed in order for the build to pass.

### Packaging
Packaging is done using Webpack 4. The packaged files will be compiled to the `dist/` directory in the
project root. For a dev build run:

```
gulp package-dev
```

This will bundle a non-minified version of the project to `dist/dev/`. For a minified, production-ready
bundle run:

```
gulp package-prod
```

The resulting bundle will be written to `dist/prod/`. Finally, to package both dev and prod bundles at the
same time:

```
gulp package
```

### Serving Locally
To run the application locally run

```
gulp serve
```

This will run the application using Webpack Dev Server with hot reloading, which makes development a lot
easier! Remember, by default, the application will look for the backend APIs at `http://localhost:29201/`.
To change that endpoint to somewhere else, set the `BT_API_URL` environment variable to the new location.
For example,

```
export BT_API_URL="https://api.my-site.com/"
```
