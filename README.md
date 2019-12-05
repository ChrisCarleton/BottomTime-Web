# Bottom Time - Web Front-End
A React-based front-end for the Bottom Time application.

Component | Status
---|---
Master Build | [![CircleCI](https://circleci.com/gh/ChrisCarleton/BottomTime-Web/tree/master.svg?style=svg&circle-token=0da34d6d5ac574445b77bfbb8904220521684aa4)](https://circleci.com/gh/ChrisCarleton/BottomTime-Web/tree/master)
Production Build | [![CircleCI](https://circleci.com/gh/ChrisCarleton/BottomTime-Web/tree/prod.svg?style=svg&circle-token=0da34d6d5ac574445b77bfbb8904220521684aa4)](https://circleci.com/gh/ChrisCarleton/BottomTime-Web/tree/prod)
Dependencies | [![dependencies Status](https://david-dm.org/ChrisCarleton/BottomTime-Web/status.svg)](https://david-dm.org/ChrisCarleton/BottomTime-Web)
Dev Dependencies | [![devDependencies Status](https://david-dm.org/ChrisCarleton/BottomTime-Web/dev-status.svg)](https://david-dm.org/ChrisCarleton/BottomTime-Web?type=dev)
Security Vulnerabilities | [![Known Vulnerabilities](https://snyk.io/test/github/ChrisCarleton/BottomTime-Web/badge.svg?targetFile=package.json)](https://snyk.io/test/github/ChrisCarleton/BottomTime-Web?targetFile=package.json)

## Access to the Backend
The application requires an [API backend](https://github.com/ChrisCarleton/BottomTime-Core) to function
properly. This can be run locally or can be a running instance out on the public Internet. Internally, the
web application is agnostic of the backend. Calls to API REST routes are simply made to local routes at
`/api/...` and so the server serving the web application needs to be configured to forward requests to
`/api/*` to the backend environment.

When developing/testing locally using the Webpack dev server this is done automatically. By default,
`/api/*` is forwarded to `http://localhost:29201/` (because that's the address at which the backend runs
locally by default.) If you wish to override that address simply set the **BT_API_URL** environment
variable to your desired URL in your terminal before invoking Webpack.

## Configuration
The application has a small number of environment variables that can be set to configure key settings.
These variables should be set in the terminal used to package the project because Webpack will hard-code
them into the bundle at build time.

* **BT_API_URL** - This environment variable is only used by the Webpack dev server when testing locally.
It can be used to override the URL to the API backend. The default value is `http://localhost:29201/`.
* **BT_GOOGLE_MAPS_API_KEY** - The Google Maps component used in the application requires an API key to
request data from Google. This key can be requested and configured in Google's Developer Console. Once you
have a key, it can be provided to the application by setting this environment variable at build time.
* **BT_WEB_URL** - Specifies the URL at which the web application can be reached. The application uses the
value of this variable to correctly compose URLs back to itself. The default value is
`http://localhost:8080/`.
* **NODE_ENV** - This one should be familiar to Node.js developers. If set to `production` Webpack will
bundle the project using production-friendly settings (compression, minification, etc.)

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
gulp serve-dev
```

This will run the application using Webpack Dev Server with hot reloading, which makes development a lot
easier! Remember, by default, the application will look for the backend APIs at `http://localhost:29201/`.
To change that endpoint to somewhere else, set the `BT_API_URL` environment variable to the new location.
For example,

```
export BT_API_URL="https://api.my-site.com/"
```

### Serving the Production Build Locally
One can also run the production build of the application on the Webpack Dev Server:

```
gulp serve-prod
```

### Steps For Testing SSO Authentication Locally
[Ngrok](https://ngrok.com/download) is a tool for creating a temporary gateway to a local port which can
be used to make your local dev instance of the site routable from the Internet by giving it a temporary
URL.

Create an ngrok account, download the client and, configure your auth token before continuing.

#### 1) Prepare the Backend
The backend should be running with the appropriate environment variables set to the correct Client ID and
Client Secret for the SSO provider(s) being tested. (See the documentation
[here](https://github.com/ChrisCarleton/BottomTime-Core/blob/master/README.md).)

#### 2) Open an Ngrok Tunnel
Run ngrok with the following command. This will create a publicly-accessible tunnel back to your local
port on which the application is running. Make a note of the HTTPS URL that ngrok provides for your tunnel.

```
ngrok http --host-header=rewrite 8080
```

**Note:** By default the web application runs on port `8080`. If you are running it on a different port,
then change the command above to reflect that.

#### 3) Whitelist the Tunnel URL
The tunnel URL will need to be whitelisted with your chosen SSO provider or else requests will be denied.

#### 4) Configure the Web Application




