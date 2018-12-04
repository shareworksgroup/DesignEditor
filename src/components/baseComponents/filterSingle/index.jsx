import React from 'react'

const MenuItem = props => {
  const item = props.item
  return <div className="item" data-item-id={item.Id}>
    {/* <div className="ui red empty circular label"></div> */}
    <span>{item.Name}</span>
  </div>
}

class FilterSingle extends React.Component {

  constructor(props) {
    super(props)
  }

  state = {
    searchText: ''
  }

  render() {
    const {data, dynamic} = this.props
    const {searchText} = this.state
    return <div className="dropdown">
      <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        Dropdown button
      </button>
      <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <a className="dropdown-item" href="#">Action</a>
        <a className="dropdown-item" href="#">Another action</a>
        <a className="dropdown-item" href="#">Something else here</a>
      </div>
    </div>
  }

}

export default FilterSingle