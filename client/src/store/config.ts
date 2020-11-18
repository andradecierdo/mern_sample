/**
 * Main store function
 */
import { applyMiddleware, compose, createStore } from 'redux'
import rootReducer from './reducers'
import thunk from 'redux-thunk'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default function (initialState = {}) {
  // Middleware and store enhancers
  const enhancers = [applyMiddleware(thunk)]

  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      enhancers.push(window.__REDUX_DEVTOOLS_EXTENSION__())
  }

  const store = createStore(rootReducer, initialState, compose(...enhancers))

  // For hot reloading reducers
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    module.hot.accept('./reducers', () => {
      const nextReducer = require('./reducers').default // eslint-disable-line global-require
      store.replaceReducer(nextReducer)
    })
  }

  return store
}
