| lang  | requirement      | tool                           | config            |
| ----- | ---------------- | ------------------------------ | ----------------- |
| js    | es6 to es5       | @babel/core                    |                   |
|       | apply to browser | @babel/preset-env              | .babelrc          |
|       |                  |                                | .browserslistrc   |
|       | apply to webpack | babel-loader                   | webpack.config.js |
|       | lint             | ====                           |                   |
|       | polyfill         | core-js                        | webpack.config.js |
| sass  | sass             | node-sass                      |                   |
|       | sass to css      | sass-loader                    | webpack.config.js |
|       | apply to webpack |                                | webpack.config.js |
| css   | apply to webpack | css-loader                     | webpack.config.js |
|       | apply to html    | mini-css-extract-plugin        | webpack.config.js |
|       |                  | sass-loader                    | webpack.config.js |
|       | postcss          | postcss                        |                   |
|       | apply to webpack | postcss-loader                 | webpack.config.js |
|       | auto prefix      | autoprefixer                   | .postcssrc.json   |
| pug   | pug              | pug                            |                   |
|       | apply to webpack | pug-loader                     | webpack.config.js |
| html  | apply to webpack | html-webpack-plugin            | webpack.config.js |
| image | minimize         | imagemin-mozjpeg               | webpack.config.js |
|       | apply to webpack | image-minimizer-webpack-plugin | webpack.config.js |
