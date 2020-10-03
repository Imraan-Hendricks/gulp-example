# gulp-example

This project serves as an example of how to use gulp. The gulp file included in this project performs a few common tasks such as minifying assets, compiling sass, file concatenation and sharing html markup.

In addition, the gulp file further includes a build and watch feature. The build feature performs all tasks required to produce production ready code and the watch feature watches all source files during development and updates the build when any changes are made.

This project is also equipped with browser sync that is initiated when performing the watch task which allows the user to make updates and have it reflect immediately in the browser for a smooth development experience.

### Requirements:

- node js v12 (current version: 12.18.0)

### Usage:

- clone repository or download source code
- open project directory in terminal
- npm install
- npm run build
- npm run watch

## Available Scripts

In the project directory, you can run:

### `npm run build`

Builds the app for production to the `build` folder. It correctly bundles the app in production mode and optimizes the build for the best performance. Your app is ready to be deployed!

### `npm run copyPhp`

Copies php files located in the php directory to the build folder.

### `npm run copyVendors`

Copies vendors located in the vendors directory to the build folder.

### `npm run compileHtml`

Compiles html files located in the src directory by using gulp-file-include to add markup templates (located in the markup directory) that can be linked to html pages, which allows for sharing markup and provides a means of abstraction. The compiled files are then sent to the build folder.

### `npm run compileJs`

Compiles all javascript files located in the js directory by concatenating them into one file called main.js, which then gets minified and sent to the build folder.

### `npm run compileSass`

Compiles sass files located in the sass directory to css, which then gets minified and sent to build folder.

### `npm run imageMin`

Minifies images located in the images directory, which then gets sent to the build folder.

### `npm run watch`

Initiates browser sync and watches source files for any changes. When a change is detected the relevant build files will be updated.
