import { uuid, global_var, action_interruptor, current_window_id } from '../util/utils.js'


import {CONFIG_AFTER_GET, config_after_get, CONFIG_AFTER_PUT, config_after_put,
        AFTER_POST, after_post, CONFIG_AFTER_DELETE, config_after_delete,
        AFTER_GET_PROJECT,after_get_project,INIT_SCROLL_STATE,init_scroll_state,
        CARD_INIT,KEY_ACTION,KONVA_APP_RERENDER,INIT,MAP_CARD_CHANGE,DRAG_MOVE,CHANGE_MODE,
        create_delete_action, get_configs, updateall_action, create_post_action,
        create_get_action, create_put_action, get_projects, delete_project,
        create_project_action, update_project_action, get_project_action, get_key,
        change_mode,parser_reload_action,map_card_change, konva_app_rerender,
        get_card_data, get_data, key_action, save_info, drag_move, open_file}  from "../store/actions"


const logger = store => next => action =>{
    let log_array = ['GET_MARKS_SUCCESS', "GET_SAVED_INFO_SUCCESS", 'INIT', "UPDATE_SAVED_INFO_REQUESTED", "CURRENT_WINDOW_ID_CHECK_FALSE","CURRENT_WINDOW_ID_CHECK_TRUE", "GET_REMOTE_KEY_REQUESTED", "GET_REMOTE_KEY_SUCCESS", "GET_PROJECTS_SUCCESS"]

        console.log("===> action logger:",action.type, action)

    let not_log_array = [undefined, KEY_ACTION,"GET_REMOTE_KEY_REQUESTED", "GET_REMOTE_KEY_SUCCESS"]
    if ((action !== undefined) && (!not_log_array.includes(action.type))){
        console.log("===> action logger:", action.type)
    }
    console.log('dispatch',action);

    let result = next(action);


    return result;
}

const current_window_id_check = store => next => action =>{

    action = action_interruptor.filter(action)
    if (action){next(action)} else return false;

}

const remote_log_action = store => next => action =>{

    if(action.type != 'CREATE_REMOTE_LOG_REQUESTED' && action.type != "CREATE_REMOTE_LOG_SUCCESS" && action.type != "CREATE_REMOTE_LOG_FAILURE")  {
        console.log("remote_log: ", action.type)
        store.dispatch({type: 'CREATE_REMOTE_LOG_REQUESTED', payload: {log_backend: action.log_backend, action_type: action.type, timestamp: new Date().getTime()}}) 
    }

    let result = next(action);

    return result;
}

export {logger, current_window_id_check, remote_log_action}
