import react from "react";
import ReactDom from "react-dom";
import App from './App'
import { Provider } from "react-redux";
import {configureStore} from '@reduxjs/toolkit'
import { applyMiddleware , compose} from 'redux'

import reducers from './reducers'

const store= configureStore({reducer : reducers})

ReactDom.render(
<Provider store={store}>
<App />
</Provider>
, document.getElementById('root'));