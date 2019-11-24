import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Redirect } from 'react-router-dom'

import { connect } from 'react-redux'


import "antd/dist/antd.css";
import { Table, Divider, Button ,Tag} from 'antd';
import { Layout } from 'antd';

import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
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





class DataIterator {
  constructor(data) {
    this.data = data;

  }

  [Symbol.iterator] () {
    let cs = [];  
      for (let c  in  this.data) {
          this.data[c]["id"] = c
          cs.push(this.data[c])
      }
    let i = 0;
    return { 
      next() {
          if (i >= cs.length) {return {value: undefined, done: true};}
          return { value: {key:i, id: cs[i].id, tag: cs[i].tag , type: cs[i].type, path: cs[i++].path}, done: false}
      }
    }
  }
}

const test = (record) =>{
}


const rowSelection = {}


class Config extends Component {


  delete_alert = (record_id) => {
    confirmAlert({
      title: '是否删除该条配置?',
      message: "",
      buttons: [
        {
          label: 'Yes',
            onClick: () => this.delete_config(record_id)
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
      this.state = {payload: new DataIterator(props.data)}
      let project_id = this.props.match.params.project_id;
      global_var.project_id = project_id;
      this.table = {};

      this.table.columns = [
      {
        title: 'type',
        dataIndex: 'type',
        render: text => <a>{text}</a>,
          key: 'type'
      },
      {
        title: 'path',
        dataIndex: 'path',
        key: 'path',
      },
      {
        title: 'tag',
        dataIndex: 'tag',
        key: 'tag',
          render: text => {
          return (
                <Tag color={"red"} key={text}>
                  {text.toUpperCase()}
                </Tag>
          );}
      },
    
      {
        title: 'action',
        key: 'action',
        render: (text, record) => (
          <span>
            <Divider type="vertical" />
                <a onClick = {e => {this.delete_alert(record.id)}}> Delete </a>
            <Divider type="vertical" />
                <a id = {`edit-${record.id}`} onClick = { e=> {/*console.log("this.props:",this.props);*/this.props.history.push(`/rest_config/${project_id}/${record.id}`)} }>Edit</a>
          </span>
        ),
      },
    
    ];
  }

  menuHandle = () => {
    this.props.menuHandle(this.props)
  }

  fetchData = () => {
      this.props.fetchTheData(this.props)
  }

  delete_config = (id) => {
      this.props.delete_config(id)
  }

  updateall = () => {
      this.props.updateall()
  }

  sendAlert = () => {
      this.props.sendTheAlert(this.props)
  }



  componentWillUnmount() {
  }



  componentDidMount() {
      this.fetchData()
      this.props.did_mount()
  }


  static  getDerivedStateFromProps(nextProps, prevState) {
      return ({payload: new DataIterator(nextProps.data), opq: "yyy"})
  }

  handleClick = ()=> this.props.history.push("/parser")

    testrenderfunction = (x) => {
        if(this.state.payload.data){
            return this.state.payload.data.directory[x];
        }else{
            return "nothing";
        }}

  componentDidUpdate(){
      this.props.did_update(JSON.stringify(Array.from(this.state.payload)))

  }


  render() {
      let project_id = this.props.match.params.project_id;

      return  <div style = {{textAlign: "center"}}>
          <div style={{ display: 'inline-block',   textAlign: 'left'}}>

          <Divider type="vertical" />
          <Button type="primary">
            Reload
          </Button>
          <Divider type="vertical" />

          <Button id = "add_config" type="primary" onClick = { e=> {this.props.history.push(`/rest_config/${project_id}`)}}>
            Add
          </Button>
          <Divider type="vertical" />

          <Button type="primary" >
            Save 
          </Button>
          <Divider type="vertical" />

          <Button type="primary" onClick = {this.updateall} >
            UpdateAll
          </Button>


        </div>

          <Table style={{overflow: "auto"}} rowSelection={rowSelection}  columns={this.table.columns} dataSource={Array.from(this.state.payload)}> </Table>
        </div>

  }
}



const mapStateToProps = (state) => {
  return {data: state.reducer_b}
}



const mapDispatchToProps = (dispatch) => {
  return {
      menuHandle: () => {/*console.log("menu");*/},
      sendTheAlert: (Props) => {/*console.log(dispatch);*/dispatch({type: 'test_map_to_props', filter: Props});},
      fetchTheData: ()=>{dispatch({type: 'GET_CONFIGS_REQUESTED'})},
      delete_config: (id) => {/*console.log("delete");dispatch(create_delete_action(id))*/dispatch({type: 'DELETE_CONFIG_REQUESTED', record_id: id})},
      updateall: () => {dispatch({type: "UPDATEALL_REQUESTED"})},
      did_update: (logbackend) =>  { dispatch({type: "COMPONENT_CONFIGS_DID_UPDATE", log_backend: logbackend})},
      did_mount: () => { dispatch({type: "COMPONENT_CONFIGS_DID_MOUNT" })},

  }}


const ConnectedConfig = connect(
  mapStateToProps,
  mapDispatchToProps
)(Config)


export {ConnectedConfig}


