import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
require('expose?$!expose?jQuery!jquery')



import Reducer from './reducers'
import App from './components/app'
import Landing from './components/auth/landing'

const store = createStore(Reducer, applyMiddleware(thunk))

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app')
)
