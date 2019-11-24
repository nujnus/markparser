const KONVA_APP_RERENDER  = "KONVA_APP_RERENDER";
const konva_app_rerender = (state) => {
  return {
    type: KONVA_APP_RERENDER,
    payload: state,
  }
}

const MAP_CARD_CHANGE = 'MAP_CARD_CHANGE';
const map_card_change = (state) => {
  return {
    type: MAP_CARD_CHANGE,
    payload: state,
  }
}


const KEY_ACTION = 'KEY_ACTION';
const key_action = (state) => {
  return {
    type: KEY_ACTION,
    payload: state,
  }
}


const CHANGE_MODE = 'CHANGE_MODE';
const change_mode = (state) => {
  return {
    type: CHANGE_MODE,
    payload: state,
  }

}

const INIT = 'INIT';
const init = (state, extra_data) => {
  return {
    type: INIT,
    payload: state,
    history_coordinate: extra_data
  }
}

const DRAG_MOVE = 'DRAG_MOVE';
const drag_move = (state) => {
  return {
    type: DRAG_MOVE,
    payload: state
  }
}

const INIT_SCROLL_STATE = 'INIT_SCROLL_STATE';
const init_scroll_state = (state) => {
  return {
    type: INIT_SCROLL_STATE,
    payload: state
  }
}


const CARD_INIT = "CARD_INIT";
const card_init = (card_id, card_data) => {
  return {
      type: CARD_INIT,
      card_id: card_id,
      response: card_data,
  }
}



const CONFIG_AFTER_GET = 'CONFIG_AFTER_GET'; 
const config_after_get = (state) => {
  return {
    type: CONFIG_AFTER_GET,
    payload: state,
  }
}


const CONFIG_AFTER_PUT = 'CONFIG_AFTER_PUT';
const config_after_put = (state) => {
  return {
    type: CONFIG_AFTER_PUT,
    payload: state,
  }
}


const AFTER_POST = 'AFTER_POST';
const after_post = (state) => {
  return {
    type: AFTER_POST,
    payload: state,
  }
}


const CONFIG_AFTER_DELETE = 'CONFIG_AFTER_DELETE';
const config_after_delete = (state) => {
  return {
    type: CONFIG_AFTER_DELETE,
    payload: state,
  }
}

const AFTER_GET_PROJECT = 'AFTER_GET_PROJECT';
const after_get_project = (state) => {
  return {
    type: AFTER_GET_PROJECT,
    payload: state,
  }
}



const backend = "http://localhost:5001"
const get_current_project_url = () => `${backend}/current_mp_project`;



const get_configs = (basic_info) =>{
}

const create_get_action = (record_id) =>{
}


const create_delete_action = (id) =>{
}



const create_post_action = (data = {'path': 'Remember the milk again', 'tag': "test", "type": "directory"}) =>{
}

const create_put_action = (record_id, data) =>{
}


const get_projects = (basic_info) =>{
}

const get_project_action = (id) =>{
}

const delete_project = (id) =>{
}


const create_project_action = (data = {'path': 'Remember the milk again', 'tag': "test", "type": "directory"}) =>{
}


const update_project_action = (id, data) =>{
}



const get_key = () =>{
}

const updateall_action = () => {
}


const parser_reload_action = () => {
}


const get_card_data = (card_id) =>{
}


const get_data = () =>{
}

const load_coordinate = (basic_info) =>{
}


const post_info = (save_data) =>{
}

const save_info = (fileData) =>{
}


const open_file = (markObj) =>{
    return {type: 'OPEN_FILE_REQUESTED', data: {filename: markObj.filename, linenumber: markObj.meta["linenum"][0]}}
}


const get_current_project = (basic_info) =>{
}

const update_current_project = (current_project_id) =>{
}



export {CONFIG_AFTER_GET, config_after_get, CONFIG_AFTER_PUT, config_after_put,
        AFTER_POST, after_post, CONFIG_AFTER_DELETE, config_after_delete,
        AFTER_GET_PROJECT,after_get_project,INIT_SCROLL_STATE,init_scroll_state,
        CARD_INIT,KEY_ACTION,KONVA_APP_RERENDER,INIT,MAP_CARD_CHANGE,DRAG_MOVE,CHANGE_MODE}

export {create_delete_action, get_configs, updateall_action, create_post_action,
        create_get_action, create_put_action, get_projects, delete_project,
        create_project_action, update_project_action, get_project_action, get_key,
        change_mode,parser_reload_action,map_card_change, konva_app_rerender,
        get_card_data, get_data, key_action, save_info, drag_move, open_file, 
        get_current_project, update_current_project}

