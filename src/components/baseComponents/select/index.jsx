import React from 'react'

class PlainSelect extends React.Component {

  state = {
    selectedVal: ''
  }

  render() {
    const {data = [12, 20, 50, 100], selectedVal = 12, pre = 'Show', suffix = 'entries', onSelect} = this.props
    const selectValue = this.state.selectedVal === '' ? selectedVal : this.state.selectedVal
    return <label class="page-select">
        {pre}&nbsp;
        <select size="1" value={selectValue} onChange={(e) => {
          this.setState({selectedVal: e.target.value})
          if (onSelect) {
            onSelect(e.target.value)
          }
        }}>
          {
            data.map(item => {
              return <option value={item}>{item}</option>
            })
          }
      </select>&nbsp;{suffix}
    </label>
  }

}

export default PlainSelect