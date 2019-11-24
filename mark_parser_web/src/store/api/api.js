import axios from 'axios'
import { uuid, global_var, action_interruptor, current_window_id } from '../../util/utils.js'
import {store} from "../store.js"


const customize_axios = axios.create({})

customize_axios.interceptors.response.use(
    response => {
        if (response.data.current_window_id !== global_var.current_window_id){
        }else{
        };
        response.data = response.data.real_response;return response},
  error => {return Promise.reject(error)}
)
const current_window_id_required_axios = axios.create({})

current_window_id_required_axios.interceptors.request.use(
  config => {config.headers.Authorization = `${current_window_id.id()}` ;return config},
  error => {console.log(error);return Promise.reject(error)}
)

current_window_id_required_axios.interceptors.response.use(
    response => {
        if (response.data.current_window_id_check){
            response.data = response.data.real_response;return response
            store.dispatch({type: "CURRENT_WINDOW_ID_CHECK_SUCCESS"});
        }else{
            action_interruptor.close_to_traffic();
            store.dispatch({type: "CURRENT_WINDOW_ID_CHECK_FALSE"});
        };
        },
    error => {console.log(error); return Promise.reject(error)}
)

export { customize_axios, current_window_id_required_axios }
