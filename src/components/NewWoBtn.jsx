import React from 'react'
class NewWoBtn extends React.Component {
  render() {
    const { onClick } = this.props
    return (
      <button onClick={onClick} type="button" className="float-add-btn" id="newWO">
        <i className="mdi-content-add fa-lg"></i>
      </button>
    )
  }
}

export default NewWoBtn