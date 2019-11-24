import { connect } from 'react-redux'
import { ConnectedGetKeyLoop } from './get_key_loop'

import { withRouter } from "react-router-dom";

import {ControlUI, KonvaApp} from "./map"
import {map_selector_converge} from "../selector/map_selector"




const get_marks = (state, props) => state.reducer_a.marks;
const get_saved_info = (state, props) => state.reducer_a.saved_info;
const get_card_id = (state, props) => props.match.params.card_id;
const get_flag= (state, props) => state.reducer_a.flag;


const mapStateToProps = (state, props) => {
  return {
      data: map_selector_converge(
          get_marks(state, props),
          get_saved_info(state, props),
          get_card_id(state, props),
          get_flag(state, props)
      )
  }
}

const mapDispatchToProps = (dispatch) => {
    return {
        update_save_info: () => dispatch({type: "UPDATE_SAVED_INFO_REQUESTED"}),
        dispatch_change_mode: (action) => dispatch(action),
        updateall_and_reload: () => dispatch({type: 'UPDATEALL_AND_RELOAD_REQUESTED'}),
        dispatch_open_file: (action) => dispatch(action),
        dispatch_drag_move: (action) => {dispatch(action);},
        get_marks_or_rerender: ()=> dispatch({type: "GET_MARKS_OR_RERENDER_REQUESTED"}),
        did_update: (logbackend) =>  { dispatch({type: "COMPONENT_MAPS_DID_UPDATE", log_backend: logbackend})},
        did_mount: () => { dispatch({type: "COMPONENT_MAPS_DID_MOUNT" })},
   }
}

const ConnectedControlUI = connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(ControlUI))

const ConnectedKonvaApp = connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(KonvaApp))


const KonvaAppWithLoop = ConnectedKonvaApp



export {ConnectedKonvaApp,  KonvaAppWithLoop }

