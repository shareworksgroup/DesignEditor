import React from 'react'
import { Scrollbars } from 'react-custom-scrollbars';
import Util from '../../utils/util'
import styles from './style.less';

const ContentLi = (props) => {
  const {data, selectedIds, toggleCheck, filterText} = props;  
  let sortData = [];
  data.forEach((item) => {
    selectedIds.includes(item._id)?sortData.unshift(item):sortData.push(item);
  });
  return sortData.filter(meta => meta._name.match(new RegExp(filterText, 'ig'))).slice(0,300).map(listInfo => {
    return <li key={listInfo._id}>
      <div className="form-check">
        <label className="form-check-label">
          <input type="checkbox" className="form-check-input"
            value={listInfo._id} checked={selectedIds.includes(listInfo._id)} 
            onChange={() => toggleCheck(listInfo)} />
          <span>{listInfo._name}</span>
        </label>
      </div>
    </li>
  })
}

const DEFAULT_HEIGHT = 350;
class DropDownWithFilter extends React.Component {

  constructor(props) {
    super(props);
    const { height = DEFAULT_HEIGHT } = props;
    this.state = {
      filterText: '',
      open: false,
      height,
    }
    this.groupNode = React.createRef()
    this.ulNode = React.createRef()
  }

  componentDidMount() {
    this.outClick = Util.outClick(this.groupNode.current, () => {
      if(this.state.open)
        this.closeSelection();
    })
    // $(this.ulNode.current).slimScroll({
    //   height: 350,
    //   allowPageScroll: false
    // })
  }

  componentWillUnmount(){
    this.outClick && this.outClick.cancel()
  }

  componentWillReceiveProps(props){
    let count = props.data.rawData.length;
    count!==0? count++ : count;
    this.autoScrollHandle(count);
  }

  
  toggleSelection = (e) => {
    this.setState({open: !this.state.open});
    if(this.input) {
      setTimeout(() => {
        this.input.focus();
      }, 100);
    }
  }
  
  closeSelection = () => {
    this.setState({open: false})
  }

  getPlaceHolderText() {
    const selectedIds = this.props.data.selectedIds;
    const items = this.props.data.rawData;
    if (selectedIds.length === 0) {
      return this.props.placeholder;
    } else if (selectedIds.length === this.props.data.rawData.length) {
      return `All selected(${this.props.data.rawData.length})`;
    } else if (selectedIds.length >= 4) {
      return `selected(${selectedIds.length})`;
    } else{
      let textArr = [];
      items.map((x) => {
        if(selectedIds.includes(x._id)){
          textArr.push(x._name);
        }
      });
      return textArr.join(', ');
    }
  }

  searchTextOnchange = (e) => {
    const items = this.props.data.rawData;
    this.setState({filterText: e.target.value});
    let count = items.filter(meta => meta._name.match(new RegExp(e.target.value, 'ig'))).length;
    if(!e.target.value){
      count = this.props.data.rawData.length;
      count!==0? count++ : count;
    }
    this.autoScrollHandle(count);
  }

  clearSearchText = () => {
    let count = this.props.data.rawData.length;
    count!==0? count++ : count;
    this.setState({filterText: ''});
    this.autoScrollHandle(count);
  }

  autoScrollHandle(count){
    const { height = DEFAULT_HEIGHT } = this.props;
    this.setState({ height: count*37 >= height? height : count*37 });
    // $(this.ulNode.current).slimScroll({
    //   height: count*37 >= 350? 350 : count*37,
    //   allowPageScroll: false
    // });
  }

  getSelectionLi() {
    const {data: {rawData}, toggleCheck} = this.props    
    return rawData.filter(meta => meta._name.match(new RegExp(this.state.filterText, 'ig'))).map(listInfo => {
      return <li key={listInfo._id}>
        <div className="form-check">
          <label className="form-check-label">
            <input type="checkbox" className="form-check-input"
              value={listInfo._id} checked={listInfo._selected} 
              onChange={() => toggleCheck(listInfo)} />
            <span>{listInfo._name}</span>
          </label>
        </div>
      </li>
    })
  }

  onToggleCheckAll = () => {
    this.props.toggleCheckAll();
  }

  render() {
    const {data: {rawData, selectedIds}, toggleCheck} = this.props
    const placeholder = this.getPlaceHolderText()
    const showSelectAll = this.state.filterText === '' && rawData.length !== 0
    const selectedAll = rawData.length === selectedIds.length;
    const cn = this.state.open ? 'dropdown-menu multi-select-dropdown show' : 'dropdown-menu multi-select-dropdown'
    return <div className="search-group dropdown-filter" onClick={this.groupClick} ref={this.groupNode}>
      {/* <input type="text" className="form-control dropdown-toggle" placeholder={placeholder} data-toggle="dropdown" /> */}
      <input readonly="readonly" type="text" onClick={this.toggleSelection} className="form-control dropdown-toggle" placeholder={placeholder} />
      <ul className={cn}>
        <li className="multi-item filter" value="0">
          <div className="input-group">
            <span className="input-group-addon"><i className="fa fa-search"></i></span>
            <input type="text" value={this.state.filterText} onChange={(e) => this.searchTextOnchange(e) }
             className="form-control multi-search" placeholder="Search" ref={(dom) => { this.input = dom;}} />
            <span onClick={this.clearSearchText} className="input-group-addon"><a className="multi-clear-filter"><i className="mdi-navigation-close"></i></a></span>
          </div>
        </li>

        <Scrollbars ref={(dom)=>{this.scroll = dom;}} style={{height: this.state.height }} autoHide>
        <div ref={this.ulNode}>
        {
          showSelectAll ? <li>
            <div className="form-check">
              <label className="form-check-label">
                <input type="checkbox" checked={selectedAll} onChange={this.onToggleCheckAll} className="form-check-input" />
                <span>Select All</span>
              </label>
            </div>
          </li> : null
        }
        {
          this.state.open ? <ContentLi data={rawData} selectedIds={selectedIds} toggleCheck={(info)=>{
            this.top = this.scroll.getScrollTop();
            toggleCheck(info);
            requestAnimationFrame(() => {
              this.scroll.scrollTop(this.top);
            });
          }} filterText={this.state.filterText} /> : null
        }
        </div>
        </Scrollbars>
      </ul>
    </div>
  }

}

export default DropDownWithFilter