# React Redux Basic layout
A simple and quick way to get you going with developing React applications with Redux and Sass.

### Components 🔩 Styles 🎨 Action! 🎬

with all ready configuration create components for your own purpose and use redux for state management

### Get started!
```
git clone
cd React-Redux-Basic
npm i
```

### Start the dev server:
```

npm run start:dev

```

### Build:
```

npm run build

```

#### Note:
* Changes made to your CSS / JS triggers a full page auto-reload.
* Running a build writes the ```bundle.js``` and ```bundle.css``` to the ```/public/dist/``` directory.

### Pre-configured tools and plugins

* Module bundler: [Webpack](https://webpack.js.org/)
* ES6 Transpiler: [babel-loader](https://github.com/babel/babel-loader)
* Linting: [eslint](https://eslint.org/)
* JS Uglification: [UglifyJsPlugin](https://webpack.js.org/plugins/uglifyjs-webpack-plugin/)
* Dev Server: [webpack-dev-server](https://github.com/webpack/webpack-dev-server) (```npm run start:dev```)

#### Codebase overview.

```
/
├─ public/
|  ├─ dist/
|  |  ├─ bundle.css           # CSS that's generated from SASS
|  |  ├─ bundle.js            # Contains scripts of components & vendor(s).
|  ├─ index.html              # Contains root element to mount your app.
└─ src/
   ├─ actions/                # Create actions here.
   |  ├─ counterActions.js
   ├─ components/             # Create components here
   |  ├─ Controls.js
   |  ├─ Counter.js
   |─ containers/             # Containers bridge Components with the State.
   |  ├─ Controls.js
   |  ├─ Counter.js
   ├─ constants/              # Define action types here.
   |  ├─ ActionTypes.js
   ├─ reducers/               # Create reducers here.
   |  ├─ counter.js
   |  ├─ index.js             # Combine your reducers here.
   ├─ styles/                 # All styling goes here.
   |  ├─ main.scss
   ├─ App.js                  # Include your main component(s).
   ├─ index.js                # Passes state to App. Renders markup to DOM.
   └─ store.js                # Creates and exports store.
```

### Learn

This starter kit assumes, you are familiar with JavaScript (ES6). If you are new to this stack, here are some resources to help you get started with:

**React** - [Quick Start](https://reactjs.org/docs/hello-world.html) | [Start Learning React](https://egghead.io/courses/start-learning-react) | [React in 8-minutes](https://medium.com/learning-new-stuff/learn-react-js-in-7-min-92a1ef023003)

**Redux** - [Basics](https://redux.js.org/docs/basics/) | [An Introduction](https://www.smashingmagazine.com/2016/06/an-introduction-to-redux/) | [React with Redux](https://www.youtube.com/watch?v=1w-oQ-i1XB8)

**Sass** - [Sass Guide](http://sass-lang.com/guide)

#### The MIT License (MIT)
MIT