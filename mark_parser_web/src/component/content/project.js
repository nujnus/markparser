import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux'

import { Table, Divider, Button ,Tag} from 'antd';
import { confirmAlert } from 'react-confirm-alert';
import {CONFIG_AFTER_GET, config_after_get, CONFIG_AFTER_PUT, config_after_put,
        AFTER_POST, after_post, CONFIG_AFTER_DELETE, config_after_delete,
        AFTER_GET_PROJECT,after_get_project,INIT_SCROLL_STATE,init_scroll_state,
        CARD_INIT,KEY_ACTION,KONVA_APP_RERENDER,INIT,MAP_CARD_CHANGE,DRAG_MOVE,CHANGE_MODE,
        create_delete_action, get_configs, updateall_action, create_post_action,
        create_get_action, create_put_action, get_projects, delete_project,
        create_project_action, update_project_action, get_project_action, get_key, 
        change_mode,parser_reload_action,map_card_change, konva_app_rerender,
        get_card_data, get_data, key_action, save_info, drag_move, open_file}  from "../../store/actions"




class ProjectIterator {
  constructor(data) {
    this.data = data;

  }

  [Symbol.iterator] () {
    let cs = [];  
      for (let c  in  this.data) {
          this.data[c]["id_copy"] = c.toString()
          cs.push(this.data[c])
      }
    let i = 0;
    return { 
      next() {
          if (i >= cs.length) {return {value: undefined, done: true};}
          return { value: {key:cs[i].id_copy, id: cs[i].id_copy, tag: cs[i].tag , projectname: cs[i].projectname, path: cs[i++].path}, done: false}
      }
    }
  }
}


const rowSelection = {}
class MyProject extends Component {
  delete_project = (id) => {
      this.props.delete_project(id)
  }

  delete_alert = (project_id) => {
    confirmAlert({
      title: '是否删除该条配置?',
      message: "",
      buttons: [
        {
          label: 'Yes',
            onClick: () => this.delete_project(project_id)
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
      this.state = {payload: []};
      this.table = {};
      this.table.columns = [
      {
        title: 'id',
        dataIndex: 'id',
        render: text => <a>{text}</a>,
          key: 'id'
      },
      {
        title: 'projectname',
        dataIndex: 'projectname',
        render: text => <a>{text}</a>,
          key: 'projectname'
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
                  {text}
                </Tag>
          );}
      },
    
      {
        title: 'action',
        key: 'action',
        render: (text, project) => (
          <span>
            <Divider type="vertical" />
                <a id = {`open-${project.id}`} onClick = {e=> {this.props.history.push(`/map/${project.id}/card1`)}} > open </a>
            <Divider type="vertical" />
                <a onClick = {e => {this.delete_alert(project.id)}}> Delete </a>
            <Divider type="vertical" />
                <a  id = {`edit-${project.id}`} onClick = { e=> {this.props.history.push(`/project/${project.id}`)} }>Edit</a>
          </span>
        ),
      },
    
    ];

  }

  fetchData =  () => {
      this.props.fetchData(this.props)
  }



  static  getDerivedStateFromProps(nextProps, prevState) {
      if(nextProps.data &&  nextProps.data.project_data) {return {payload: new ProjectIterator(nextProps.data.project_data)}}
      else {return null}
  }


  componentDidMount() {
      this.fetchData()
      this.props.did_mount()
  }

  componentDidUpdate(){
      this.props.did_update(JSON.stringify(this.state))
  }

  componentWillUnmount = () => {
      this.props.will_unmount()
      console.log("project unmount")
  }

  render() {
      return <div ><h2>project config</h2>
             <div style={{  textAlign: 'right'}}>
             <Button id = "add_new_project" type="primary" onClick = { e=> {this.props.history.push("/project/")}}>
               Add New
             </Button>
             </div>
             <Table style={{overflow: "auto"}} rowSelection={rowSelection}  columns={this.table.columns} dataSource={Array.from(this.state.payload)}></Table>
             </div>
}


}

const mapStateToProps = (state) => {
  return {
    data: state.reducer_a
  }
}


const mapDispatchToProps = (dispatch) => { return {
    fetchData:  ()=>{  dispatch({type: 'GET_PROJECTS_REQUESTED'})},
    delete_project: (id) => {dispatch({type: 'DELETE_PROJECT_REQUESTED', project_id:id})},
    did_update: (logbackend) =>  { dispatch({type: "COMPONENT_PROJECTS_DID_UPDATE", log_backend: logbackend})},
    will_unmount: () => { dispatch({type: "COMPONENT_WILL_UNMOUNT" })},
    did_mount: () => { dispatch({type: "COMPONENT_PROJECTS_DID_MOUNT" })},

}}

const ConnectedMyProject = connect(
  mapStateToProps,
  mapDispatchToProps,
)(MyProject)


export {ConnectedMyProject}
