import React from 'react'
const mobxReact = require('mobx-react')

class CheckBoxWithInput extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      filterText: ''      
    }
  }

  afterClick = false
  afterClickTimeout
  clicked() {
    this.afterClick = true
    if (this.afterClickTimeout) {
      clearTimeout(this.afterClickTimeout)
    }
    this.afterClickTimeout = setTimeout(() => {
      this.afterClick = false
    }, 500)
  }

  toggleSelection = () => {
    this.setState({open: !this.state.open})
  }

  openSelection = () => {
    this.setState({open: true})
  }

  closeSelection = () => {
    if (!this.afterClick) {
      this.setState({open: false})
    }
  }

  toggleCheck = (data) => {
    this.clicked()
    this.props.toggleCheck(data)
  }

  toggleCheckAll = () => {
    this.clicked()    
    this.props.toggleCheckAll(this.props.data)    
  }

  getSelectionLi() {
    const {data} = this.props    
    return data.filter(meta => meta.Name.match(new RegExp(this.state.filterText, 'ig'))).map(listInfo => {
      return <li className="">
        <a>
          <label className="checkbox">
            <input type="checkbox" value={listInfo.Id} checked={listInfo._selected} onChange={() => this.toggleCheck(listInfo)} />
            <span>{listInfo.Name}</span>
          </label>
        </a>
      </li>
    })
  }

  getPlaceHolderText() {
    const selectedItems = this.props.data.filter(item => item._selected)
    if (selectedItems.length === 0) {
      return this.props.placeholder
    } else if (selectedItems.length === this.props.data.length) {
      return `All selected(${this.props.data.length})`
    }
    return selectedItems.map(condi => condi.Name).join(', ')
  }

  componentDidMount() {
  }

  render() {
    const {open} = this.state
    const {data} = this.props
    const cn = open ? 'btn-group btn-multiselect-group open' : 'btn-group btn-multiselect-group'
    const showSelectAll = this.state.filterText === '' && data.length !== 0
    const selectedAll = data.every(info => info._selected)  
    return (
      <div className="search-group">
        <div className={cn}>        
          <button onClick={this.toggleSelection} type="button" className="multiselect dropdown-toggle btn-multiselect" data-toggle="dropdown" title="Filter by WO Type"
            aria-expanded="true">
            <span className="multiselect-selected-text">{this.getPlaceHolderText()}</span>
            <b className="caret"></b>
          </button>
          <ul className="multiselect-container dropdown-menu">
            <li className="multiselect-item filter" value="0">
              <div className="input-group">
                <span className="input-group-addon">
                  <i className="glyphicon glyphicon-search"></i>
                </span>
                <input value={this.state.filterText} onChange={(e) => this.setState({filterText: e.target.value})} className="form-control multiselect-search" type="text" placeholder="Search" aria-invalid="false" />
                <span className="input-group-btn">
                  <button onClick={() => this.setState({filterText: ''})} className="btn btn-default multiselect-clear-filter" type="button">
                    <i className="glyphicon glyphicon-remove-circle"></i>
                  </button>
                </span>
              </div>
            </li>
            {
              showSelectAll ? <li className="multiselect-item multiselect-all">
                <a className="multiselect-all">
                  <label className="checkbox">
                    <input type="checkbox" checked={selectedAll} onChange={this.toggleCheckAll} />
                    <span> Select all</span>
                  </label>
                </a>
              </li> : null
            }
            {
              this.getSelectionLi()
            }
          </ul>
        </div>
      </div>
    )
  }
}

export default mobxReact.observer(CheckBoxWithInput)