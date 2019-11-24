import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux'
import { Card } from 'antd';
import { Collapse } from 'antd';


import { confirmAlert } from 'react-confirm-alert';

import {check, until, till, before, after, limit, every, and, sleep} from 'wait-promise';
import {wait} from 'wait-promise';

import { global_var } from '../../util/utils.js'
import {CONFIG_AFTER_GET, config_after_get, CONFIG_AFTER_PUT, config_after_put,
        AFTER_POST, after_post, CONFIG_AFTER_DELETE, config_after_delete,
        AFTER_GET_PROJECT,after_get_project,INIT_SCROLL_STATE,init_scroll_state,
        CARD_INIT,KEY_ACTION,KONVA_APP_RERENDER,INIT,MAP_CARD_CHANGE,DRAG_MOVE,CHANGE_MODE,
        create_delete_action, get_configs, updateall_action, create_post_action,
        create_get_action, create_put_action, get_projects, delete_project,
        create_project_action, update_project_action, get_project_action, get_key,
        change_mode,parser_reload_action,map_card_change, konva_app_rerender,
        get_card_data, get_data, key_action, save_info, drag_move, open_file}  from "../../store/actions"





const { Panel } = Collapse;


class MyCard extends Component {



  submit = (fileObj) => {
    confirmAlert({
      title: '是否打开文件?',
      message: "",
      buttons: [
        {
          label: 'Yes',
            onClick: () => this.props.dispatch_open_file(open_file(fileObj)) 
        },
        {
          label: 'No',
            onClick: () => {/*console.log("do nothing")*/}
        }
      ]
    });
  };



  constructor(props){
    super(props)
      global_var.card_id = this.props.match.params.card_id;
      global_var.project_id = this.props.match.params.project_id;

      this.state = {cards_with_value: {card1:[], card2:[], card3:[], card4:[], card5:[]}}
      this.reg = new RegExp("\n", "g")

      this.state.card_id =  global_var.card_id;
      this.state.project_id =  global_var.project_id;


  }
  componentWillUnmount() {
      this.props.will_unmount()
  }


  componentDidMount() {
    let card_id = this.props.match.params.card_id;

    this.props.dispatch_get_marks_requested({type:'INIT_CARD_REQUESTED', card_id: global_var.card_id});

    this.props.did_mount()
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return nextProps.data
  }


  componentDidUpdate(){
      this.props.did_update(JSON.stringify("循环了"))

  }


  render() {
      console.log("render:",this.state)
      console.log("card state", this.state)

      return this.state.cards_with_value[this.state.card_id].map((cardObj, index) => {
        cardObj.value = cardObj.value||"";
        return (
          <Collapse accordion
            defaultActiveKey = {[`card title:${cardObj.mark_id}`]}
            key = {`card title:${cardObj.mark_id}`}>

            <Panel header={cardObj.filename} key={`card title:${cardObj.mark_id}`}>
                <a onClick= {() => {
                    /*console.log(cardObj);*/this.submit(this.state.allmarks[cardObj.mark_id])}} >
                    {cardObj.mark_id}
                </a>
                <div>{cardObj.value.split("\n").map((i,index)=>{
                    return <p style={{margin: "1px"}} key={`card-value-${cardObj.mark_id}-${index}`}>{i}</p>})}
                </div>
            </Panel>
          </Collapse>)})}}


const mapStateToProps = (state) => {
  return {
      data: {cards_with_value: state.reducer_a.cards_with_value, allmarks: state.reducer_a.allmarks}
  }
}

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch_get_marks_requested: (action) => dispatch(action),
        dispatch_open_file: (action) => dispatch(action),
        will_unmount: () => { dispatch({type: "COMPONENT_CARD_WILL_UNMOUNT" })},
        did_update: (logbackend) =>  { dispatch({type: "COMPONENT_CARD_DID_UPDATE", log_backend: logbackend})},
        did_mount: () => { dispatch({type: "COMPONENT_CARD_DID_MOUNT" })},

    }
}

const ConnectedMyCard = connect(
  mapStateToProps,
  mapDispatchToProps,
)(MyCard)

export {ConnectedMyCard}
