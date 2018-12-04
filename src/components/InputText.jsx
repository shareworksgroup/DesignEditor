import React from 'react'
import classnames from 'classnames'
const mobxReact = require('mobx-react')

class InputText extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showList: false
    }
  }

  queryChange = (e) => {
    this.props.queryChange(e.target.value)
  }

  choose = (data) => {
    this.props.choose(this.props.data, data)
    this.hideList()
  }

  showList = () => {
    this.setState({showList: true})
  }

  hideList = () => {
    this.setState({showList: false})
  }

  inputKeyDown = (e) => {
    // backspace
    if (e.keyCode === 8) {
      this.props.clear()
    }
  }

  render() {
    const {query, data, clear, type, id} = this.props
    const ulStyle = {display: this.state.showList ? 'block' : 'none'}
    const selected = data.find(item => item._selected)
    const inputShowText = selected ? selected.Name : query
    return (
      <div className="" onMouseLeave={this.hideList}>
        <div className="search-group">
          <input onMouseEnter={this.showList} onFocus={this.showList} value={inputShowText} onKeyDown={this.inputKeyDown} id={id}
             onChange={this.queryChange} name="TestReactiveWoNumber" type="text" className="form-control input-sm"
              placeholder={type} data-bind="value: woNum" data-autocomplete="ReactiveWoNumber" />
          <a onClick={clear} className="close"><i className="fa fa-close f12"></i></a>
        </div>
        <ul style={ulStyle} className="ui-autocomplete ui-front ui-menu ui-widget ui-widget-content ui-corner-all react-ipt-ul" id="ui-id-2">
          {
            data.map(item => {
              const cn = classnames({'input-sigle-active': item._selected, 'ui-menu-item': true})
              return <li key={item.Id} onClick={this.choose.bind(this, item)} className={cn} role="presentation">
                <a id="ui-id-32" className="ui-corner-all" >{item.Name}</a>
              </li>
            })
          }
        </ul>
      </div>
    )
  }
}

export default mobxReact.observer(InputText)