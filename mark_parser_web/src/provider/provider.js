import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { Provider} from 'react-redux'
import {store} from "../store/store"
import {AppRouter} from "../router/router.js"




const AppRender = () => {
  ReactDOM.render(
    <Provider store = {store}>
         <AppRouter/>
    </Provider>,
    document.getElementById("app"));
}
export {AppRender}  

