import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux'

class MyError extends Component {

  constructor(props){
    super(props)
  }

  componentWillReceiveProps(nextProps){
  }

  render() {
      return <div> 404 page not found </div>
  }

}

const mapStateToProps = (state) => {
  return {
    data: state.reducer_a
  }
}

const mapDispatchToProps = (state) => { return {}}

const ConnectedMyError = connect(
  mapStateToProps,
  mapDispatchToProps,
)(MyError)

export {ConnectedMyError}
