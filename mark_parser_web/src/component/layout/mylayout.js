import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import {CONFIG_AFTER_GET, config_after_get, CONFIG_AFTER_PUT, config_after_put,
        AFTER_POST, after_post, CONFIG_AFTER_DELETE, config_after_delete,
        AFTER_GET_PROJECT,after_get_project,INIT_SCROLL_STATE,init_scroll_state,
        CARD_INIT,KEY_ACTION,KONVA_APP_RERENDER,INIT,MAP_CARD_CHANGE,DRAG_MOVE,CHANGE_MODE,
        create_delete_action, get_configs, updateall_action, create_post_action,
        create_get_action, create_put_action, get_projects, delete_project,
        create_project_action, update_project_action, get_project_action, get_key,
        change_mode,parser_reload_action,map_card_change, konva_app_rerender,
        get_card_data, get_data, key_action, save_info, drag_move, open_file,
        get_current_project, update_current_project} from "../../store/actions"

import {uuid, global_var} from "../../util/utils"
import {action_interruptor, current_window_id} from "../../util/utils.js"


import { connect } from 'react-redux'
import { Provider} from 'react-redux'


import { Redirect } from 'react-router-dom'
import { Layout, Menu, Icon } from 'antd';

import { BrowserRouter as Router, withRouter,Switch, Route, Link } from "react-router-dom";

import ToggleDisplay from 'react-toggle-display';


const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;


class MyLayout extends Component {
  constructor(props){
    super(props)

    this.myRef = React.createRef()

    let path_reg =  /\/project\/*/

    let init_project_name =  "";
    let init_contentVw =  "100vw";
    let init_contentLeft =  "0vw";
    let init_header_color =  "white";

    let collapsed_contentVw =  "88vw";
    let collapsed_contentLeft =  "12vw";


    this.unlisten = this.props.history.listen((location, action) => {
        if(location.pathname == "/projects/"){

            this.setState({ show: false , project_name: init_project_name, contentVw: init_contentVw, contentLeft: init_contentLeft, header_color: init_header_color});
        }else if (path_reg.test(location.pathname)){
            this.setState({ show: false , project_name: init_project_name, contentVw: init_contentVw, contentLeft: init_contentLeft, header_color: init_header_color});
        }else{

            this.setState({ show: true , project_name: "测试项目", contentVw: collapsed_contentVw, contentLeft: collapsed_contentLeft,  header_color: init_header_color});
        }
    });


    console.time("MyLayout mount"); 
    if(this.props.location.pathname == "/projects/"){
        this.state = { show: false , project_name: init_project_name, contentVw: init_contentVw, contentLeft: init_contentLeft, header_color: init_header_color};
    }else if (path_reg.test(this.props.location.pathname)){
        this.state = { show: false , project_name: init_project_name, contentVw: init_contentVw, contentLeft: init_contentLeft, header_color: init_header_color};
    }else{
        this.state = { show: true , project_name: "测试项目", contentVw: collapsed_contentVw, contentLeft: collapsed_contentLeft, header_color: init_header_color};
    }
    this.state.card_id = this.props.match.params.card_id;
    this.state.project_id = this.props.match.params.project_id;


  }

  static getDerivedStateFromProps(nextProps, prevState) {
    console.time("MyLayout update"); 
    if (nextProps.data == undefined) {return prevState}
    return nextProps.data
  }

  clearDoStuff = () => {
      clearTimeout(this.timer)
  }


  doStuff = () => {
  }


  componentWillUnmount = () => {
      this.props.will_unmount()
      console.log("project unmount")
  }


  componentDidMount() {
      this.props.dispatch_init_scroll_state(init_scroll_state(this.myRef.current))
      this.props.did_mount()
  }


  jumpToConfig = () => {
    this.props.history.push(`/config/${this.props.match.params.project_id}`) 
  }

  jumpToCard1 = () => {
      this.props.history.push(`/map/${this.props.match.params.project_id}/card1`) 
  }

  jumpToCard2 = () => {
      this.props.history.push(`/map/${this.props.match.params.project_id}/card2`) 
  }

  jumpToCard3 = () => {
      this.props.history.push(`/map/${this.props.match.params.project_id}/card3`) 
  }

  jumpToCard4 = () => {
      this.props.history.push(`/map/${this.props.match.params.project_id}/card4`) 
  }

  jumpToCard5 = () => {
      this.props.history.push(`/map/${this.props.match.params.project_id}/card5`) 
  }

  jumpToCardsEdit = () => {
    this.props.history.push("/cards/") 
  }

  jumpToProjects = () => {
    this.props.history.push("/projects/") 
  }

  active_this_window = () => {
    this.props.set_remote()

    action_interruptor.open_to_traffic();
    this.props.dispatch_current_window_id_check_true()
  }

  render() {
      return (
    <Layout>
              <Header className="header" style={{ position: 'fixed', width: "100vw", height:"5vh", top:'0px', left:'0px', background: this.state.header_color}} >
        <div className="logo" />
              <Menu theme="light"  mode="horizontal" defaultSelectedKeys={['2']} style={{ lineHeight: '5vh',width: "100vw",background: this.state.header_color }} >
          <Menu.Item key="1" id="project" onClick={this.jumpToProjects} >PROJECT</Menu.Item>

          <Menu.Item key="2">{this.state.project_name}</Menu.Item>
          <Menu.Item key="3" onClick={this.active_this_window} >active</Menu.Item>

        </Menu>
      </Header>
      <ToggleDisplay show={this.state.show}>

      <Sider style={{ position: 'fixed',
                       height: '95vh',
                       left: '0',
                      top: '6vh',
                      width: "15vw",
                      overflow: 'scroll',
                      background: "white",
                     }}
        breakpoint="lg"
        collapsedWidth="12vw"
        onBreakpoint={broken => {
        }}
        onCollapse={(collapsed, type) => {
        }} >
      <div className="logo" />
            <Menu defaultSelectedKeys={['1']} defaultOpenKeys={['sub1']} mode="inline" theme="light" >
            <Menu.Item key="2" id = "jumpToConfig" onClick={this.jumpToConfig}>
              <Icon type="setting" style={{color: "red"}}/>
            <span id = "open-config">Config</span>
          </Menu.Item>

            <Menu.Item key="card_map1" id = "card_map1" onClick={this.jumpToCard1}>
              <Icon style={{color: "red"}}type="smile" />
              <span  >card map 1</span>
            </Menu.Item>

            <Menu.Item key="card_map2" id = "card_map2" onClick={this.jumpToCard2}>
              <Icon style={{color: "#99CC66"}}type="smile" />
              <span  >card map 2</span>
            </Menu.Item>


            <Menu.Item key="card_map3" id = "card_map3" onClick={this.jumpToCard3}>
              <Icon style={{color: "#003399"}}type="smile" />
              <span  >card map 3</span>
            </Menu.Item>

            <Menu.Item key="card_map4" id = "card_map4" onClick={this.jumpToCard4}>
              <Icon style={{color: "#CCCC33"}}type="smile" />
              <span  >card map 4</span>
            </Menu.Item>

            <Menu.Item key="card_map5" id = "card_map5" onClick={this.jumpToCard5}>
              <Icon style={{color: "#999999"}}type="smile" />
              <span  >card map 5</span>
            </Menu.Item>

            <Menu.Item key="4" onClick={this.jumpToCardsEdit}>
            <Icon type="inbox" />
          <span  >card opt</span>
          </Menu.Item>


        </Menu>
    </Sider>
      </ToggleDisplay>
      <Content  >
      <div ref = {this.myRef } style={{ padding: 24, background: "#eee", textAlign: "left",  position: "fixed", height: "95vh",width: this.state.contentVw, left: this.state.contentLeft ,top: "6vh", overflow: "scroll"}}>
              {this.props.children}
        </div>
      </Content>

      <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
  </Layout>)
  }
}


const mapStateToProps = (state) => {
  return {data: state.reducer_layout}
}

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch_init_scroll_state: (action) => dispatch(action),
        dispatch_current_window_id_check_true: () => dispatch({type: "CURRENT_WINDOW_ID_CHECK_TRUE"}),
        set_remote: () => dispatch({type: "SET_REMOTE_CURRENT_WINDOW_ID_REQUESTED", current_window_id: current_window_id}),
        will_unmount: () => { dispatch({type: "COMPONENT_LAYOUT_WILL_UNMOUNT" , log_backend: "layout"})},
        did_mount: () => { dispatch({type: "COMPONENT_LAYOUT_DID_MOUNT" , log_backend: "layout"})},
        menu_item_click: (project_and_card_id) => dispatch({type:"MENU_ITEM_CLICK_HAPPEND", payload: project_and_card_id})
    }
}

const WithRouterConnectedMyLayout = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(MyLayout))


function Index() {
  return <h2>Home</h2>;
}

export {WithRouterConnectedMyLayout, MyLayout}
