import React from 'react'

class IconExport extends React.Component {

  render() {
    const {onClick, text = ' Export to Excel'} = this.props
    return <button onClick={this.props.onClick} type="button" className="btn btn-sm btn-default mr5">
      <i className="fa fa-sign-out"></i>
      &nbsp;{text}
    </button>
  }

}

export default IconExport