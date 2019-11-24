import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux'


class GetKeyLoop extends Component {
  constructor(props){
    super(props)
    this.timer = null;
  }

  componentDidMount() {
      console.log("what happend?")
  }


  render() {
      return <div></div>
  }
}

const mapStateToProps = (state) => {
  return {
    data: state.reducer_a
  }
}

const mapDispatchToProps = (dispatch) => {
    return {
        get_remote_key: () => dispatch({type: "GET_REMOTE_KEY_REQUESTED"}),
    }
}

const ConnectedGetKeyLoop = connect(
  mapStateToProps,
  mapDispatchToProps,
)(GetKeyLoop)

export {ConnectedGetKeyLoop}


