import React from 'react'

class IconSearch extends React.Component {

  render() {
    return <button onClick={this.props.onClick} type="button" className="btn btn-primary btn-long mr-1" id="searchBtn">
      <i className="fa fa-search"></i>
    </button>
  }

}

export default IconSearch