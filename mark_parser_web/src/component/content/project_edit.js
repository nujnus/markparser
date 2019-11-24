import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux'
import {Layout,Divider, Button, Form, Input, DatePicker, TimePicker, Select, Cascader, InputNumber } from 'antd';
import {CONFIG_AFTER_GET, config_after_get, CONFIG_AFTER_PUT, config_after_put,
        AFTER_POST, after_post, CONFIG_AFTER_DELETE, config_after_delete,
        AFTER_GET_PROJECT,after_get_project,INIT_SCROLL_STATE,init_scroll_state,
        CARD_INIT,KEY_ACTION,KONVA_APP_RERENDER,INIT,MAP_CARD_CHANGE,DRAG_MOVE,CHANGE_MODE,
        create_delete_action, get_configs, updateall_action, create_post_action,
        create_get_action, create_put_action, get_projects, delete_project,
        create_project_action, update_project_action, get_project_action, get_key,
        change_mode,parser_reload_action,map_card_change, konva_app_rerender,
        get_card_data, get_data, key_action, save_info, drag_move, open_file}  from "../../store/actions"




const { Content } = Layout;

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


class MyProjectEdit extends Component {

  constructor(props){
    super(props)
    this.state = {path:"path", projectname:"name", tag:"example"}

  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return nextProps.data.current_project
  }


  componentDidMount() {
      if (this.props.match.params.project_id) {
          this.get_project(this.props.match.params.project_id)
      }else {
      }
      this.props.did_mount()
  }

  get_project = (id) => {
     this.props.get_project(id)
  }

  update_project(id, form_data){
      this.props.update_project(id, form_data)
  }

  create_project(form_data){
    this.props.create_project(form_data)
  }

  componentDidUpdate(){
      this.props.did_update(JSON.stringify(this.state))
  }


  render() {
      const { getFieldDecorator } = this.props.form;
      return (
         <Content style={{ width: "70vw", margin: '100px 220px 0', overflow: 'auto' }}>
         <div align="center">
              <Button id = "back_to_projects" type="primary" onClick={e => this.props.history.push("/projects/")}> Back </Button>
              <p> 参数: {this.props.match.params.project_id}</p>
              <Form {...formItemLayout}
          onSubmit={(e) => {
            e.preventDefault();
            if (this.props.match.params.project_id) {
                this.update_project(this.props.match.params.project_id, this.props.form.getFieldsValue())
            }else{
               this.create_project(this.props.form.getFieldsValue());
            }

          }}
              >

        <Form.Item label="projectname" >
          {getFieldDecorator('projectname', {
            rules: [{ required: true, message: 'Please input your project name!' }],
            initialValue: this.state.projectname
          })(
            <Input placeholder="projectname"/>)}
        </Form.Item>


        <Form.Item label="path">
          {getFieldDecorator('path', {
            rules: [{ required: true, message: 'Please input your note!' }],
            initialValue: this.state.path
          })(<Input  />)}
        </Form.Item>


        <Form.Item label="tag"
          validateStatus="error"
          help="Should be combination of numbers & alphabets" >
          {getFieldDecorator('tag', {
            rules: [],
            initialValue: this.state.tag
          })(
            <Input placeholder="unavailable choice" />  )}
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
}


const mapStateToProps = (state) => {
  return {
    data: state.reducer_a
  }
}

const mapDispatchToProps = (dispatch) => {
    return {
        create_project: (data) => {dispatch({type: "CREATE_PROJECT_REQUESTED", data: data})},
        update_project: (project_id, data) => {dispatch({type: "UPDATE_PROJECT_REQUESTED", project_id: project_id, data: data})},
        get_project: (project_id) => {dispatch({type: "GET_PROJECT_REQUESTED", project_id: project_id})},
        did_update: (logbackend) =>  { dispatch({type: "COMPONENT_PROJECT_DID_UPDATE", log_backend: logbackend})},
        did_mount: () => { dispatch({type: "COMPONENT_PROJECT_DID_MOUNT" })},
    }}

const ConnectedMyProjectEdit = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Form.create({})(MyProjectEdit))

export {ConnectedMyProjectEdit}
