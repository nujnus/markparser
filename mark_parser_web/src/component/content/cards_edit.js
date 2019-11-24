import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux'

class MyCardsEdit extends Component {

  constructor(props){
    super(props)
  }

  componentWillReceiveProps(nextProps){
  }

  render() {
      return <div> card edit </div>
  }

}

const mapStateToProps = (state) => {
  return {
    data: state.reducer_a
  }
}

const mapDispatchToProps = (state) => { return {}}

const ConnectedMyCardsEdit = connect(
  mapStateToProps,
  mapDispatchToProps,
)(MyCardsEdit)

export {ConnectedMyCardsEdit}
