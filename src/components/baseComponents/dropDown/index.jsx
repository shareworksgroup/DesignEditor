import React from 'react'

class DropDown extends React.Component {

  constructor(props) {
    super(props)
  }

  onSelectChange = e => {
    console.log(e.target.value)
    this.props.onSelectChange(e.target.value)
  }

  render() {
    const {data: {rawData, selectedIds}, onSelectChange, placeholder} = this.props;
    const selected = selectedIds[0]?selectedIds[0]:'unselect';
    return <div className="search-group">
      <select className="form-control input-sm search-select" value={selected} onChange={this.onSelectChange} placeholder={placeholder}>
          <option value={'unselect'}>{placeholder}</option>
          {
            rawData.map(item => {
              return <option value={item._id}>{item._name}</option>
            })
          }
      </select>
  </div>
  }

}

export default DropDown