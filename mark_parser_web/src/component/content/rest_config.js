import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import {CONFIG_AFTER_GET, config_after_get, CONFIG_AFTER_PUT, config_after_put,
        AFTER_POST, after_post, CONFIG_AFTER_DELETE, config_after_delete,
        AFTER_GET_PROJECT,after_get_project,INIT_SCROLL_STATE,init_scroll_state,
        CARD_INIT,KEY_ACTION,KONVA_APP_RERENDER,INIT,MAP_CARD_CHANGE,DRAG_MOVE,CHANGE_MODE,
        create_delete_action, get_configs, updateall_action, create_post_action,
        create_get_action, create_put_action, get_projects, delete_project,
        create_project_action, update_project_action, get_project_action, get_key,
        change_mode,parser_reload_action,map_card_change, konva_app_rerender,
        get_card_data, get_data, key_action, save_info, drag_move, open_file}  from "../../store/actions"



import { global_var } from '../../util/utils.js'

import {Layout,Divider, Button, Form, Input, DatePicker, TimePicker, Select, Cascader, InputNumber } from 'antd';
const { Content } = Layout;


const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 5 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 12 },
  },
};




class MyRestConfig extends Component {

    get_config = (project_id, record_id) => {
        this.props.get_config(project_id, record_id)
    }
  create_config = (form_data) =>{
    this.props.create_config(form_data)
  }

    update_config = (record_id, form_data) =>{
        this.props.update_config(record_id, form_data)
  }


  componentDidMount() {
      if (this.props.match.params.record_id) {
          this.get_config(this.props.match.params.project_id, this.props.match.params.record_id)
      }else {
      }
      this.props.did_mount()
  }



  constructor(props){
    super(props)
    this.state = {path:"/tmp", type:"directory", tag:"example"}

    this.unlisten = this.props.history.listen((location, action) => {
    });

  }



  componentWillUnmount() {
      this.unlisten();
  }


  static getDerivedStateFromProps(nextProps, prevState) {
    return nextProps.data
  }



  render() {
      let project_id = this.props.match.params.project_id;
      console.log("project_id", project_id)
      const { getFieldDecorator } = this.props.form;
      return (
         <Content style={{ width: "70vw", margin: '100px 220px 0', overflow: 'auto' }}>
         <div align="center">
           <Button id = "back_to_configs" type="primary" onClick={e => this.props.history.push(`/config/${project_id}`)}> Back </Button>
              <p> id: {this.props.match.params.record_id}</p>
              <Form {...formItemLayout}
          onSubmit={(e) => {
            e.preventDefault();
            if (this.props.match.params.record_id) {
                this.update_config(this.props.match.params.record_id, this.props.form.getFieldsValue())
            }else{
               this.create_config(this.props.form.getFieldsValue());
            }

          }}
              >

        <Form.Item label="path">
          {getFieldDecorator('path', {
            rules: [{ required: true, message: 'Please input your note!' }],
              initialValue: (this.state.path? this.state.path : "")
          })(<Input  placeholder="文件或文件夹路径" />)}
        </Form.Item>


        <Form.Item label="type" /* warning状态 */ >
          {getFieldDecorator('type', {
            rules: [],
            initialValue: this.state.type
          })(
            <Input placeholder="file或directory"  /* 实际的input控件, 预占字符串:Warning */ />)}
        </Form.Item>


        <Form.Item label="tag">
          {getFieldDecorator('tag', {
            rules: [],
            initialValue: this.state.tag
          })(
            <Input placeholder="注释说明"  /*实际的input控件, placholder表示里面的预占字符串*/  />  )}
        </Form.Item>

   
        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            submit
          </Button>
        </Form.Item>

        </Form>
      </div>
    </Content>)

  }
    componentDidUpdate(){
        this.props.did_update(JSON.stringify(this.state))
    }

}

const mapStateToProps = (state) => {
  return {
    data: state.reducer_rest_config
  }
}

const mapDispatchToProps = (dispatch) => {
    return {
        create_config: (data) => {dispatch({type: 'CREATE_CONFIG_REQUESTED', data: data})},
        get_config: (project_id, record_id) => {dispatch({type: 'GET_CONFIG_REQUESTED', record_id: record_id, project_id: project_id})},
        update_config: (record_id, data) => {dispatch({type: 'UPDATE_CONFIG_REQUESTED', record_id: record_id, data: data})},
        did_update: (logbackend) =>  { dispatch({type: "COMPONENT_CONFIG_DID_UPDATE", log_backend: logbackend})},
        did_mount: () => { dispatch({type: "COMPONENT_CONFIG_DID_MOUNT" })},
    }
}

const ConnectedMyRestConfig = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Form.create({})(MyRestConfig))

export {ConnectedMyRestConfig}
