import { createStore, applyMiddleware } from 'redux'
import createLogger from 'redux-logger'
import reducer from '../reducers'

const loggerMiddleware = createLogger()

export default function configureStore(preloadedState) {
    return createStore(
        reducer,
        preloadedState,
        applyMiddleware(
            loggerMiddleware
        )
    )
}