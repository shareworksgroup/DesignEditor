import React from 'react'
import ReactDOM from 'react-dom'

class PlusRightDown extends React.Component {

  render() {
    return ReactDOM.createPortal(
      (<button onClick={this.props.onClick} type="button" className="float-btn btn-new" id="newWidgetBtn">
      <i className="mdi-content-add"></i>
      </button>), 
      document.body
    )
  }

}

export default PlusRightDown