import React, { Component } from 'react';
import ReactDOM from 'react-dom';


import Konva from 'konva';
import {Group, Label,Tag, Image, Line, Arrow, Stage, Layer, Rect, Text, Circle } from 'react-konva';

import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

import { global_var } from '../../util/utils.js'


import {CONFIG_AFTER_GET, config_after_get, CONFIG_AFTER_PUT, config_after_put,
        AFTER_POST, after_post, CONFIG_AFTER_DELETE, config_after_delete,
        AFTER_GET_PROJECT,after_get_project,INIT_SCROLL_STATE,init_scroll_state,
        CARD_INIT,KEY_ACTION,KONVA_APP_RERENDER,INIT,MAP_CARD_CHANGE,DRAG_MOVE,CHANGE_MODE,
        create_delete_action, get_configs, updateall_action, create_post_action,
        create_get_action, create_put_action, get_projects, delete_project,
        create_project_action, update_project_action, get_project_action, get_key,
        change_mode,parser_reload_action,map_card_change, konva_app_rerender,
        get_card_data, get_data, key_action, save_info, drag_move, open_file,
        get_current_project, update_current_project} from "../../store/actions.js"

class ControlUI extends Component {
  constructor(props){
    super(props)
      console.log("controlui props", props)
      console.log("controlui this.props", this.props)
      this.state = {button_text: props.data.flag, fileData: props.fileData, konvas_background_color: "#eee" }
  }



  componentDidUpdate() {
      console.log("what?this.props", this.props)
  }

  static getDerivedStateFromProps(nextProps, prevState) {

      console.log("static props:",nextProps)
      return nextProps.data
  }


  save_position(event) {
    this.props.update_save_info()
  }

  change_mode(event) {

    console.log("what?", this.props.props)
    this.props.dispatch_change_mode(change_mode())

  }

  jumpToCard = () => {
      console.log("this.props.history:", this.props.history)
      console.log("state:", this.state)
      this.props.history.push({pathname: `/card/${global_var.project_id}/${global_var.card_id}`}) 
  }

  render() {
      return <div>
          <button id="save" onClick={this.save_position.bind(this)}>save</button>
          <button id="click" onClick={this.change_mode.bind(this)}>{this.state.flag}</button>
          <button onClick={e => {/*console.log("action call:parser_reload_action");store.dispatch(parser_reload_action());*/
              this.props.updateall_and_reload()
          }}>reload</button>
          <button id="card" onClick={e=>{/*console.log("this.props for konvas:",this.props);*/this.jumpToCard()}}>card</button>
        </div>
  }
}


class MyGroup extends Component {
  constructor(props) {
    super(props);
      this.state = {group: props.group}

  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return nextProps
  }

  render() {
    return <Group>{this.props.children(this.state.group)}</Group>
  }
}


class KonvaApp extends Component {

  submit = (x) => {
    confirmAlert({
      title: '是否打开文件?',
      message: "",
      buttons: [
        {
          label: 'Yes',
            onClick: () => {console.log("openfile",x); this.props.dispatch_open_file(open_file(x)) }

        },
        {
          label: 'No',
            onClick: () => {/*console.log("do nothing")*/}
        }
      ]
    });
  };

  eventTest = e => {
  }

  constructor(props) {
    super(props);
    console.log("control ui props", props)

    this.state = {
        fileData: (props.data.fileData ? props.data.fileData : {files: []}),
        line: (props.data.line ? props.data.line : []),
        isLoaded: false,
        flag: "CLICK",
    };

    let card_id = this.props.match.params.card_id;
    global_var.card_id = card_id;

    let project_id = this.props.match.params.project_id;
    global_var.project_id = project_id;


  }

  static getDerivedStateFromProps(nextProps, prevState) {
      console.log("control ui props", nextProps)
      return nextProps.data
  }


  componentDidMount() {
    this.props.did_mount()

  }

  componentDidUpdate() {

  }

  componentWillUnmount() {

      console.log("unMount again?")
  }


  mouse_enter_on_click = () => {document.body.style.cursor = "pointer";}
  mouse_leave_on_click = () => {document.body.style.cursor = "default";}
  mouse_click_record = (file_data) => {this.submit(file_data)}

  mouse_enter_on_drag = () => {document.body.style.cursor = "move";}
  mouse_leave_on_drag = () => {document.body.style.cursor = "default";}
  on_drag_end = (event)=>{
                      let index = event.target.index;
                      let  filename = this.state.fileData.files[index].filename;
                      let group_x = event.target._lastPos.x;
                      let group_y = event.target._lastPos.y;
      console.log("group_x event", event.target)
      console.log("group_x", group_x)

      this.props.dispatch_drag_move(drag_move({filename: filename, group_x: group_x, group_y: group_y}));

                  }

  componentDidUpdate(){
      this.props.did_update(JSON.stringify("123"))
  }

  render() {
      console.log("map state", this.state)

    this.ui_callback_properties = {}
    if (this.state.flag == "DRAG" ) {
        this.ui_callback_properties = {draggable: true,
                       mouse_enter: this.mouse_enter_on_drag,
                       mouse_leave: this.mouse_leave_on_drag,
                       mouse_click_record: (e)=>{},

                       drag_end: this.on_drag_end.bind(this),
                      }
    }else {
        this.ui_callback_properties = {draggable: false,
                       mouse_enter: this.mouse_enter_on_click,
                       mouse_leave: this.mouse_leave_on_click,
                       mouse_click_record: this.mouse_click_record,
                       drag_end: null,
                      }}


      return <div style={{ background: this.state.konvas_background_color}}>
          <ControlUI {...this.props} flag = {this.state.flag} />
          <Stage width={window.innerWidth * 3}
             height={window.innerHeight * 2}
             onKeyDown={this.eventTest}
             style={{
                 margin: "0",
                 padding: "0",
                 }}>

            <Layer>
              {this.state.fileData.files.map((file_object, i)=> (
                <Group  key={file_object.filename}
                  x={file_object.group_x }
                  y={file_object.group_y}

                  draggable = {this.ui_callback_properties.draggable}
                  onMouseEnter={ this.ui_callback_properties.mouse_enter}
                  onMouseLeave={ this.ui_callback_properties.mouse_leave}
                  onDragEnd={this.ui_callback_properties.drag_end} >


                  <Label opacity={0.75} x = {0} y = {0}>
                      <Text text={file_object.marks[0].filename} x = {10} y = {3} width={'auto'} fill={'black'} />
                  </Label>

                  <MyGroup group={file_object}>
                    {(file_object) => file_object.marks.map((mark, i)=> (
                      <Group x = {0} y = {mark.y} key={i}
                        onClick={() => {this.ui_callback_properties.mouse_click_record(mark);}} >
                        <Rect
                            x = {0}
                            y = {0}
                            stroke={mark.color}
                            width={200}
                            height={mark.height * 20}
                            fill={mark.background_color} />
                            <Label  opacity={0.75}  x = {10} y = {5} >
                            <Text text={
                                mark.meta["title"].trimStart()}
                                width={'auto'} fill={'blue'} />
                        </Label>
                      </Group>
                    ))}
                  </MyGroup>
                </Group>))}

              {this.state.lines.map((line, i)=> (<Arrow key={i}
                  x={0}
                  y={10}
                  points={
                      [line["start"].group.group_x + line["start"].x + 200,
                       line["start"].group.group_y + line["start"].y,
                       line["end"].group.group_x + line["end"].x,
                       line["end"].group.group_y + line["end"].y]
                  }
                  tension={0.2}
                  stroke="gray"
                  opacity={0.5}
                  />
                ))}
             </Layer>
          </Stage></div>
}}


export {ControlUI, KonvaApp}
