
import React from 'react'
import Dialog from 'rc-dialog'

class RcDialog extends React.Component {
  render() {
    return (
      <div style={{ width: '90%', margin: '0 auto' }}>
        <Dialog
          animation="zoom"
          maskAnimation="fade"
          className="w-75"
          wrapClassName="center"
        >
          {this.props.children}
        </Dialog>
      </div>
    )
  }
}

export default RcDialog