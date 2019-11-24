import {logger, current_window_id_check, remote_log_action} from "../store/middle_ware"
import {reducer} from "./reducer.js"

import createSagaMiddleware from 'redux-saga'
import { rootSaga }  from "../store/saga"
import  thunk  from 'redux-thunk';
import { applyMiddleware, createStore } from 'redux';


const sagaMiddleware = createSagaMiddleware();

const store = createStore(reducer, applyMiddleware(remote_log_action, logger, thunk, sagaMiddleware)) 

sagaMiddleware.run(rootSaga);

export {store}
