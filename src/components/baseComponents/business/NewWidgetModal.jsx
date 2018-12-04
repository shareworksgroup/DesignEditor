
import React from 'react'
import Dialog from 'rc-dialog'

class NewWidgetModal extends React.Component {
  state = {
    visible: false,
    destroyOnClose: false,
    mousePosition: {},
  }

  onClick = e => {
    this.setState({
      mousePosition: {
        x: e.pageX,
        y: e.pageY,
      },
      visible: true,
    })
  }

  onClose = e => {
    this.setState({
      visible: false,
    })
  }

  render() {
    return (
      <div style={{ width: '90%', margin: '0 auto' }}>
        <p>
          <button onClick={this.onClick} type="button" className="float-btn btn-new" id="newWidgetBtn">
            <i className="mdi-content-add"></i>
          </button>
        </p>
        <Dialog
          visible={this.state.visible}
          // wrapClassName={wrapClassName}
          animation="zoom"
          maskAnimation="fade"
          onClose={this.onClose}
          mousePosition={this.state.mousePosition}
          destroyOnClose={this.state.destroyOnClose}
          className="w-75"
          wrapClassName="flex-all-center"
        >
          {this.props.children}
        </Dialog>
      </div>
    );
  }
}

export default NewWidgetModal