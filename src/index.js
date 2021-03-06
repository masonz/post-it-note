import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import App from './containers/App'
import configureStore from './store'
import './index.css'

const store = configureStore()

window.onbeforeunload = () => {
  localStorage.clear()
  let notes = store.getState().notes
  localStorage.setItem('post-in-note', JSON.stringify(notes))
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
