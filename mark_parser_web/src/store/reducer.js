import { Base64 } from 'js-base64';
import _ from 'lodash';

import { combineReducers } from 'redux';
import {map_selector, permutation, permutation2, coordinate_relationship_calc, MarkIterator, DataToFileIterator} from '../component/selector/map_selector';
import {key_selector} from '../component/selector/key_selector';

import {CONFIG_AFTER_GET, config_after_get, CONFIG_AFTER_PUT, config_after_put,
        AFTER_POST, after_post, CONFIG_AFTER_DELETE, config_after_delete,
        AFTER_GET_PROJECT,after_get_project,INIT_SCROLL_STATE,init_scroll_state,
        CARD_INIT,KEY_ACTION,KONVA_APP_RERENDER,INIT,MAP_CARD_CHANGE,DRAG_MOVE,CHANGE_MODE,
        create_delete_action, get_configs, updateall_action, create_post_action,
        create_get_action, create_put_action, get_projects, delete_project,
        create_project_action, update_project_action, get_project_action, get_key,
        change_mode,parser_reload_action,map_card_change, konva_app_rerender,
        get_card_data, get_data, key_action, save_info, drag_move, open_file}  from "../store/actions"


const init_state = {
    "reducer_a": {
        test: [],
        flag: "CLICK",
        saved_info: {cards: {card1:[], card2:[], card3:[], card4:[], card5:[]}, coordinate:{}},
        marks: {},
        cards_with_value: {card1:[], card2:[], card3:[], card4:[], card5:[]},
        fileData : { cards: {}},
    },
    "reducer_layout": {},
    "reducer_rest_config": 0,
    "reducer_b": 0,
}


const reducer_layout = (state = init_state.reducer_layout, action) => {
  switch (action.type) {
      case "CURRENT_WINDOW_ID_CHECK_TRUE":
        return state;

      case "CURRENT_WINDOW_ID_CHECK_FALSE":
        return state;

      default:
        return state;
  }
}

const reducer_rest_config = (state = init_state.reducer_rest_config, action) => {

  switch (action.type) {
      case 'UPDATE_CONFIG_SUCCESS':
        return action.payload;
      case "GET_CONFIG_SUCCESS":
        return action.payload;
      default:
        return state;
  }
}

const reducer_b = (state = init_state.reducer_b, action) => {
  switch (action.type) {

      case 'DELETE_CONFIG_SUCCESS':
          return state;

      case 'GET_CONFIGS_SUCCESS':
          let new_result = [];
          new_result = Object.assign(new_result, action.payload);
          return  new_result;

      case 'test_map_to_props':
          let new_config = {xconfig: "changed"}
          new_config = Object.assign(new_config, state);
          return  new_config

      case 'fetch_config_data':
        return state

      case "test":
        return state;

      default:
        return state;
}}



const reducer_a = (state = init_state.reducer_a, action) => {
  switch (action.type) {
      case "after_update_current_project":
          return  state;

      case 'UPDATE_CURRENT_PROJECT_SUCCESS':
          return  state;

      case 'AFTER_GET_PROJECT':
      case 'GET_PROJECT_SUCCESS':
          state.current_project = action.payload;
          return Object.assign({}, state);

      case 'GET_PROJECTS_SUCCESS':
          state.project_data = action.payload;
          let new_projects = [];
          new_projects = Object.assign(new_projects, state);
          return  new_projects;

      case CARD_INIT:
      case "GET_CARD_SUCCESS":

        state.cards_with_value[action.card_id] = action.response;

        return Object.assign({}, state)


      case INIT_SCROLL_STATE:
        return Object.assign({scroll_state: action.payload}, state)

      case 'GET_REMOTE_KEY_SUCCESS':
        if(action.payload ==  "CURRENT_WINDOW_ID_CHECK_FALSE"){return state;}
        return key_selector(state, action);

      case 'GET_MARKS_SUCCESS':
        state.marks = Object.assign({}, action.payload);

        return Object.assign({}, state)

      case 'GET_SAVED_INFO_SUCCESS':
        state.saved_info = action.payload;
        return Object.assign({}, state)

      case MAP_CARD_CHANGE:

      case DRAG_MOVE:
        console.log("run again:",DRAG_MOVE)
        state.saved_info.coordinate[action.payload.filename] = [action.payload.group_x, action.payload.group_y]
        
        state.saved_info =  Object.assign({}, state.saved_info);
        return  Object.assign({}, state); 

      case CHANGE_MODE:

        console.log("flag:", state.flag);
        if (state.flag == "DRAG") {state.flag = "CLICK"} else {state.flag = "DRAG"}

      return Object.assign( {}, state)

      case "CURRENT_WINDOW_ID_CHECK_TRUE":  //这个还暂时没有考虑好.
        state.current_window_id_check = true;
        return  Object.assign({}, state);

      case "CURRENT_WINDOW_ID_CHECK_FALSE":
        state.konvas_background_color = "red";
        return  Object.assign({}, state)

      default:
        console.log("未找到匹配的reducer_a action:", action.type)
        return state;
}}

const reducer = combineReducers({reducer_a, reducer_b,  reducer_rest_config, reducer_layout})

export {reducer}

