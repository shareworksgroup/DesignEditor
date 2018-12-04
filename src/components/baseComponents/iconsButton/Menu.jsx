import React from 'react'

class IconMenu extends React.Component {

  render() {
    return <button onClick={this.props.onClick} type="button" className="btn btn-primary mr-1"
       data-toggle="modal" data-target="#advanSearch">
      <i class="fa fa-bars"></i>
    </button>
  }

}

export default IconMenu