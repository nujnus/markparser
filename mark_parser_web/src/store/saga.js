import{ take, takeEvery, put, call } from 'redux-saga/effects'
import {CONFIG_AFTER_GET, config_after_get, CONFIG_AFTER_PUT, config_after_put,
        AFTER_POST, after_post, CONFIG_AFTER_DELETE, config_after_delete,
        AFTER_GET_PROJECT,after_get_project,INIT_SCROLL_STATE,init_scroll_state,
        CARD_INIT,KEY_ACTION,KONVA_APP_RERENDER,INIT,MAP_CARD_CHANGE,DRAG_MOVE,CHANGE_MODE,
        create_delete_action, get_configs, updateall_action, create_post_action,
        create_get_action, create_put_action, get_projects, delete_project,
        create_project_action, update_project_action, get_project_action, get_key,
        change_mode,parser_reload_action,map_card_change, konva_app_rerender,
        get_card_data, get_data, key_action, save_info, drag_move, open_file}  from "../store/actions"
import { global_var } from '../util/utils.js'
import {customize_axios, current_window_id_required_axios} from "./api/api.js"
import {store} from "../store/store"

import axios from 'axios'


const backend = "http://localhost:5001"

const get_mpconfigs_url = () => `${backend}/mpconfigs/${global_var.project_id}`;
const get_mpconfig_url = (project_id, id) => `${backend}/mpconfigs/${project_id}/${id}`;
const delete_mpconfig_url = (id) => `${backend}/mpconfigs/${global_var.project_id}/${id}`;
const create_mpconfig_url = () => `${backend}/mpconfigs/${global_var.project_id}`;
const update_mpconfig_url = (id) => `${backend}/mpconfigs/${global_var.project_id}/${id}`

const get_projects_url = () => `${backend}/mpprojects`;
const get_project_url = (id) =>  `${backend}/mpprojects/${id}`;
const delete_project_url = (id) => `${backend}/mpprojects/${id}`;
const create_project_url = () => `${backend}/mpprojects`;
const update_project_url = (id) => `${backend}/mpprojects/${id}`;


const get_card_url = (id) => `${backend}/card/${global_var.project_id}/${id}`;
const get_marks_url = () => `${backend}/marks/${global_var.project_id}`; 
const get_saved_info_url = () => `${backend}/save/${global_var.project_id}`;
const update_save_info_url = () => `${backend}/save/${global_var.project_id}`;
const get_current_project_url = () => `${backend}/current_mp_project`;
const update_current_project_url = () => `${backend}/current_mp_project/`;

const get_remote_key_url = () => `${backend}/remote_key`;
const updateall_url = () => `${backend}/updateall/${global_var.project_id}`;
const open_file_url = () => `${backend}/open_file/${global_var.current_window_id}`;

const set_current_window_id_url = () => `${backend}/current_window_id`;


const log_backend = "http://localhost:5002"
const create_remote_log_url = () => `${log_backend}/logs`;


function* create_remote_log_saga(action) {
    try {
        console.log("remote_log_saga:", action)
        const response = yield call(axios.post, create_remote_log_url(), action.payload)
        yield put({type: 'CREATE_REMOTE_LOG_SUCCESS', payload: response.data});
    } catch(error) {
        console.log("remote_log_saga error:", error)

        yield put({type: 'CREATE_REMOTE_LOG_FAILURE'});
    }
}

const get_api_cache = {}
function memoize(method) {
    let cache = get_api_cache;
    
    return async function() {
        let args = JSON.stringify(arguments);
        cache[args] = cache[args] || method.apply(this, arguments);
        return cache[args];
    };
}

function* init_card_saga(action) {
    try {
        yield put({type: 'GET_MARKS_REQUESTED'})
        yield put({type:'GET_CARD_REQUESTED', card_id: action.card_id})
        yield put({type: 'INIT_CARD_SUCCESS'});
    } catch(error) {
        yield put({type: 'INIT_CARD_FAILURE'});
    }
}

function* get_configs_saga(action) {
    try {
        const response = yield call(customize_axios.get, get_mpconfigs_url())

        yield put({type: "SAGA_REMOTE_LOG_REQUESTED", log_backend: JSON.stringify(response.data)});

        yield put({type: 'GET_CONFIGS_SUCCESS', payload: response.data});
    } catch(error) {
        yield put({type: 'GET_CONFIGS_FAILURE'});
    }
}

function* get_config_saga(action) {
    try {
        const response = yield call(customize_axios.get, get_mpconfig_url(action.project_id, action.record_id))

        yield put({type: "SAGA_REMOTE_LOG_REQUESTED", log_backend: JSON.stringify(response.data)});

        yield put({type: 'GET_CONFIG_SUCCESS', payload: response.data});
    } catch(error) {
        yield put({type: 'GET_CONFIG_FAILURE'});
    }
}

function* delete_config_saga(action) {
    try {
        const response = yield call(customize_axios.delete, delete_mpconfig_url(action.record_id))
        yield put({type: 'DELETE_CONFIG_SUCCESS', payload: response.data});

        yield put({type: "SAGA_REMOTE_LOG_REQUESTED", log_backend: JSON.stringify(response.data)});

        yield put({type: 'GET_CONFIGS_REQUESTED'});
    } catch(error) {
        yield put({type: 'DELETE_CONFIG_FAILURE'});
    }
}

function* create_config_saga(action) {
    try {
        const response = yield call(customize_axios.post, create_mpconfig_url(), action.data)

        yield put({type: "SAGA_REMOTE_LOG_REQUESTED", log_backend: JSON.stringify(response.data)});

        yield put({type: 'CREATE_CONFIG_SUCCESS', payload: response.data});
    } catch(error) {
        yield put({type: 'CREATE_CONFIG_FAILURE'});
    }
}

function* update_config_saga(action) {
    try {
        const response = yield call(customize_axios.put, update_mpconfig_url(action.record_id) , action.data)

        yield put({type: "SAGA_REMOTE_LOG_REQUESTED", log_backend: JSON.stringify(response.data)});

        yield put({type: 'UPDATE_CONFIG_SUCCESS', payload: response.data});
    } catch(error) {
        yield put({type: 'UPDATE_CONFIG_FAILURE'});
    }
}


function* get_projects_saga(action) {
    try {
        const response = yield call(customize_axios.get, get_projects_url())

        yield put({type: "SAGA_REMOTE_LOG_REQUESTED", log_backend: JSON.stringify(response.data)});

        yield put({type: 'GET_PROJECTS_SUCCESS', payload: response.data});
    } catch(error) {
        yield put({type: 'GET_PROJECTS_FAILURE'});
    }
}

function* get_project_saga(action) {
    try {
        const response = yield call(customize_axios.get, get_project_url(action.project_id))

        yield put({type: "SAGA_REMOTE_LOG_REQUESTED", log_backend: JSON.stringify(response.data)});

        yield put({type: 'GET_PROJECT_SUCCESS', payload: response.data});
    } catch(error) {
        yield put({type: 'GET_PROJECT_FAILURE'});
    }

}
function* delete_project_saga(action) {
    try {
        const response = yield call(customize_axios.delete, delete_project_url(action.project_id))

        yield put({type: "SAGA_REMOTE_LOG_REQUESTED", log_backend: JSON.stringify(response.data)});

        yield put({type: 'DELETE_PROJECT_SUCCESS', payload: response.data});
        yield put({type: 'GET_PROJECTS_REQUESTED'});
    } catch(error) {
        yield put({type: 'DELETE_PROJECT_FAILURE'});
    }

}
function* create_project_saga(action) {
    try {
        const response = yield call(customize_axios.post, create_project_url(), action.data)

        yield put({type: "SAGA_REMOTE_LOG_REQUESTED", log_backend: JSON.stringify(response.data)});

        yield put({type: 'CREATE_PROJECT_SUCCESS', payload: response.data});
    } catch(error) {
        yield put({type: 'CREATE_PROJECT_FAILURE'});
    }

}
function* update_project_saga(action) {
    try {
        const response = yield call(customize_axios.put, update_project_url(action.project_id), action.data)

        yield put({type: "SAGA_REMOTE_LOG_REQUESTED", log_backend: JSON.stringify(response.data)});

        yield put({type: 'UPDATE_PROJECT_SUCCESS', payload: response.data});
    } catch(error) {
        yield put({type: 'UPDATE_PROJECT_FAILURE'});
    }
}


function* get_card_saga(action) {
    try {
        const response = yield call(customize_axios.get, get_card_url(action.card_id))

        yield put({type: "SAGA_REMOTE_LOG_REQUESTED", log_backend: JSON.stringify(response.data)});

        yield put({type: 'GET_CARD_SUCCESS', card_id: action.card_id, response: response.data});
    } catch(error) {
        console.log("error:", error)
        yield put({type: 'GET_CARD_FAILURE'});
    }
}
function* component_maps_update_saga(action) {
    try {
        yield put({type: 'GET_MARKS_REQUESTED'})
        yield put({type: 'GET_SAVED_INFO_REQUESTED'});

    } catch(error) {
        console.log(error);
        yield put({type: 'COMPONENT_MAPS_DID_MOUNT_FAILURE'});
    }
}


function* menu_item_click_saga(action){
    try {
        console.log("xxx button_info in saga:", action)
        yield put({type: 'COMPONENT_MAPS_UPDATE_REQUESTED', payload: action.payload }) // 
    } catch(error) {
        console.log(error)
        yield put({type: 'MENU_ITEM_CLICK_HAPPEND_FAILURE'});
    }
}


function* get_marks_saga(action) {
    try {
        console.log("xxx button get_marks_saga")
        let get_marks_api = memoize(async function(url) {return await customize_axios.get(url)})

        let response = yield call(get_marks_api, get_marks_url())
        yield put({type: 'GET_MARKS_SUCCESS', payload: response.data})

        yield put({type: "SAGA_REMOTE_LOG_REQUESTED", log_backend: JSON.stringify(response.data)});

    } catch(error) {
        console.log(error)
        yield put({type: 'GET_MARKS_FAILURE'});
    }
}

function* get_saved_info_saga(action) {
    try {
        let get_saved_info_api = memoize(async function(url) {return await customize_axios.get(url)})

        const response = yield call(get_saved_info_api, get_saved_info_url())
        yield put({type: 'GET_SAVED_INFO_SUCCESS', payload: response.data})

        yield put({type: "SAGA_REMOTE_LOG_REQUESTED", log_backend: JSON.stringify(response.data)});

    } catch(error) {
        yield put({type: 'GET_SAVED_INFO_FAILURE'});
    }
}

function* update_saved_info_saga(action) {
    try {
        

        const response = yield call(customize_axios.post, update_save_info_url(), store.getState().reducer_a.saved_info)

        yield put({type: "SAGA_REMOTE_LOG_REQUESTED", log_backend: JSON.stringify(response.data)});

        alert("保存完成")
    } catch(error) {
        console.log(error)
        yield put({type: 'UPDATE_SAVED_INFO_FAILURE'});
    }
}

function* get_current_project_saga(action) {
    try {
        const response = yield call(customize_axios.get, get_current_project_url())

        yield put({type: "SAGA_REMOTE_LOG_REQUESTED", log_backend: JSON.stringify(response.data)});

        yield put({type: 'GET_CURRENT_PROJECT_SUCCESS', payload: response.data});
    } catch(error) {
        yield put({type: 'GET_CURRENT_PROJECT_FAILURE'});
    }
}

function* udpate_current_project_saga(action) {
    try {
        const response = yield call(customize_axios.put, update_project_url(action.project_id), {current_mpproject_id: action.current_project_id})

        yield put({type: "SAGA_REMOTE_LOG_REQUESTED", log_backend: JSON.stringify(response.data)});

        yield put({type: 'UPDATE_CURRENT_PROJECT_SUCCESS', payload: response.data});
    } catch(error) {
        yield put({type: 'UPDATE_CURRENT_PROJECT_FAILURE'});
    }
}
function* get_remote_key_saga(action) {
    try {
        const response = yield call(current_window_id_required_axios.get, get_remote_key_url())

        yield put({type: "SAGA_REMOTE_LOG_REQUESTED", log_backend: JSON.stringify(response.data)});

        if ((response) && (response.data) && (response.data.key !== "nokey")) {
            yield put({type: 'GET_REMOTE_KEY_SUCCESS', payload: response.data});
        }
    } catch(error) {
        yield put({type: 'GET_REMOTE_KEY_FAILURE'});
    }
}

function* updateall_saga(action) {
    try {
        const response = yield call(customize_axios.get, updateall_url())

        yield put({type: "SAGA_REMOTE_LOG_REQUESTED", log_backend: JSON.stringify(response.data)});

        yield put({type: 'UPDATEALL_SUCCESS', payload: response.data});
    } catch(error) {
        yield put({type: 'UPDATEALL_FAILURE'});
    }
}

function* updateall_and_reload_saga(action) {
    try {
        const response = yield call(customize_axios.get, updateall_url())

        yield put({type: "SAGA_REMOTE_LOG_REQUESTED", log_backend: JSON.stringify(response.data)});

        yield put({type: "GET_MARKS_REQUESTED"});
        yield put({type: 'UPDATEALL_AND_RELOAD_SAGA_SUCCESS'});
    } catch(error) {
        yield put({type: 'UPDATEALL_AND_RELOAD_SAGA_FAILURE'});
    }
}


function* open_file_saga(action) {
    try {
        const json_data = {filename: action.data.filename, linenumber: action.data.linenumber}
        const response = yield call(customize_axios.post, open_file_url(), json_data)

        yield put({type: "SAGA_REMOTE_LOG_REQUESTED", log_backend: JSON.stringify(response.data)});

        yield put({type: 'OPEN_FILE_SUCCESS', payload: response.data});
    } catch(error) {
        console.log(error)
        yield put({type: 'OPEN_FILE_FAILURE'});
    }
}


function* set_remote_current_window_id(action) {
    try {
        const response = yield call(customize_axios.put, set_current_window_id_url(), {current_window_id: action.current_window_id})

        yield put({type: "SAGA_REMOTE_LOG_REQUESTED", log_backend: JSON.stringify(response.data)});

        yield put({type: 'SET_REMOTE_CURRENT_WINDOW_ID_SUCCESS', payload: response.data});
    } catch(error) {
        yield put({type: 'SET_REMOTE_CURRENT_WINDOW_ID_FAILURE'});
    }
}


function* rootSaga() {
  yield [
      yield takeEvery('GET_CONFIGS_REQUESTED', get_configs_saga),
      yield takeEvery('GET_CONFIG_REQUESTED', get_config_saga),
      yield takeEvery('DELETE_CONFIG_REQUESTED', delete_config_saga),
      yield takeEvery('CREATE_CONFIG_REQUESTED', create_config_saga),
      yield takeEvery('UPDATE_CONFIG_REQUESTED', update_config_saga),

      yield takeEvery('GET_PROJECTS_REQUESTED', get_projects_saga),
      yield takeEvery('GET_PROJECT_REQUESTED', get_project_saga),
      yield takeEvery('DELETE_PROJECT_REQUESTED', delete_project_saga),
      yield takeEvery('CREATE_PROJECT_REQUESTED', create_project_saga),
      yield takeEvery('UPDATE_PROJECT_REQUESTED', update_project_saga),

      yield takeEvery('GET_CARD_REQUESTED', get_card_saga),
      yield takeEvery('GET_MARKS_REQUESTED', get_marks_saga),
      yield takeEvery('GET_SAVED_INFO_REQUESTED', get_saved_info_saga),
      yield takeEvery('UPDATE_SAVED_INFO_REQUESTED', update_saved_info_saga),
      yield takeEvery('GET_CURRENT_PROJECT_REQUESTED', get_current_project_saga),
      yield takeEvery('UPDATE_CURRENT_PROJECT_REQUESTED', udpate_current_project_saga),

      yield takeEvery('GET_REMOTE_KEY_REQUESTED',  get_remote_key_saga),
      yield takeEvery('UPDATEALL_REQUESTED',  updateall_saga),
      yield takeEvery('UPDATEALL_AND_RELOAD_REQUESTED',  updateall_and_reload_saga),

      yield takeEvery('OPEN_FILE_REQUESTED',  open_file_saga),
      yield takeEvery('SET_REMOTE_CURRENT_WINDOW_ID_REQUESTED',  set_remote_current_window_id),

      yield takeEvery('INIT_CARD_REQUESTED',  init_card_saga),


      yield takeEvery('COMPONENT_MAPS_DID_MOUNT',       component_maps_update_saga),
      yield takeEvery('COMPONENT_MAPS_UPDATE_REQUESTED',  component_maps_update_saga),


      yield takeEvery("CREATE_REMOTE_LOG_REQUESTED",  create_remote_log_saga),

      yield takeEvery("MENU_ITEM_CLICK_HAPPEND",  menu_item_click_saga)
  ]
}


export {rootSaga, get_marks_saga}
