import React from 'react'
import Moon from 'moon';
import classnames from 'classnames'
import Util from '../../utils/util';

class DropDownInput extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      query: '',
      showUl: false,
      //keyboardIndex: -1
    }
    this.searchGroup = React.createRef()
    this.searchGroupUl = React.createRef()
  }

  inputKeyDown = (e) => {
    // backspace
    //console.log('inputkeydown')
    // switch (e.keyCode) {
    //   case 8:
    //     //this.props.queryChange(e.target.value);
    //   break
    //   // Up Arrow
    //   case 38:
    //     this.keyboardSelect('up')
    //   break
    //   // Down Arrow
    //   case 40:
    //     this.keyboardSelect('down')
    //   break
    //   case 13:
    //     this.choose(this.props.data[this.state.keyboardIndex])
    //     // this.setState({keyboardIndex: -1})
    //     // console.log(this.searchGroupUl.current)
    //     // $(this.searchGroupUl.current).removeClass('show')
    //     this.setState({showUl: false})
    //   break
    //}
  }

  componentDidMount() {
    this.outClick = Util.outClick(this.searchGroup.current, () => { 
      if(this.state.showUl)
        this.setState({showUl: false});  
    })
  }

  componentWillUnmount(){
    this.outClick && this.outClick.cancel();
  }

  keyboardSelect(direction) {
    if (direction === 'up') {
      this.setState((prevState, props) => {
        prevState.keyboardIndex--
        return prevState.keyboardIndex < 0 ? {keyboardIndex: props.data.length - 1} : {keyboardIndex: prevState.keyboardIndex}
      })
      
    } else {
      this.setState((prevState, props) => {
        prevState.keyboardIndex++
        return prevState.keyboardIndex > props.data.length - 1 ? {keyboardIndex: 0} : {keyboardIndex: prevState.keyboardIndex}
      })
    }
  }

  queryChange = (e) => {
    this.setState({query: e.target.value});
    this.props.queryChange(e.target.value);
  }

  choose(data) {
    this.setState({query: data._name})
    this.setState({showUl: false})          
    this.props.choose(data);
  }

  onClear = () => {
    const { onClear = Moon.fn } = this.props;
    this.setState({query: ''});
    onClear();
  }

  showInputQuery = () => {
    this.setState({showUl: true})    
  }

  render() {
    const {placeholder, data: {rawData, selectedIds} } = this.props;
    const selected = selectedIds;
    let inputShowText = this.props.queryString? this.props.queryString : this.state.query;
    const originCn = 'dropdown-menu multi-select-dropdown multi-select-dropdown-line'
    const dropdownCn = this.state.showUl ? originCn + ' show' : originCn;
    return <div className="search-group" ref={this.searchGroup}>
      <input type="text" value={inputShowText} className="form-control input-sm" onFocus={this.showInputQuery}
        placeholder={placeholder}  onChange={this.queryChange} onKeyDown={this.inputKeyDown} />
      <a onClick={this.onClear} tabindex="-1" class="close"><i class="fa fa-close f12"></i></a>
      {
        rawData.length ?
          <ul className={dropdownCn} ref={this.searchGroupUl}>
          {
            rawData.map((item, index) => {
              const cn = classnames({'keyboard-on': this.state.keyboardIndex === index})
              return <li className={cn} key={item._id} onClick={this.choose.bind(this, item)}>
                <a href="javascript:void(0)">{item._name}</a>
              </li>
            })
          }
        </ul> : null
      }   
    </div>
  }
}

export default DropDownInput