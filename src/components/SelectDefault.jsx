import React from 'react'
const mobxReact = require('mobx-react')
import Select, { Option } from 'rc-select'

class SelectDefault extends React.Component {
  constructor(props) {
    super(props)
  }

  onChange = (e) => {
    let value
    if (e && e.target) {
      value = e.target.value
    } else {
      value = e
    }
    if (value) {
      const clickedItem = this.props.data.find(data => data.Id === value)
      this.props.choose(this.props.data, clickedItem)
    } else {
      this.props.choose(this.props.data, {})
    }
  }

  render() {
    const {data, placeholder} = this.props
    const selected = data.find(item => item._selected)
    const sValue = selected ? selected.Id : placeholder
    return (
      <div className="search-group">
        <Select
          value={sValue}
          placeholder="placeholder"
          dropdownMenuStyle={{ maxHeight: 200 }}
          style={{ width: '100%' }}
          allowClear
          optionLabelProp="children"
          optionFilterProp="text"
          onChange={this.onChange}
          firstActiveValue="2"
          backfill>
          {
            data.map(item => {
              return <Option value={item.Id} key={item.Id} text={item.Name}>
                {item.Name}
              </Option>
            })
          }
        </Select>
      </div>
    )
  }
}

export default mobxReact.observer(SelectDefault)