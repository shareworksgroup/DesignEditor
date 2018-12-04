import React from 'react'
import Util from '../../utils/util';

class DropDownWithSearch extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      open: false,
      searchString: ''
    }
    this.groupNode = React.createRef()
    this.ulNode = React.createRef()    
  }

  componentDidMount() {
    this.outClick = Util.outClick(this.groupNode.current, () => { 
      if(this.state.open)
        this.closeSelection()
    })
    this.autoScrollHandle(0);
  }

  componentWillReceiveProps(props){
    let count = props.data.rawData.length;
    this.autoScrollHandle(count);
  }

  componentWillUnmount(){
    this.outClick && this.outClick.cancel()
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
    if(selectedIds.length === 0){
      return this.props.placeholder;
    }else {
      return `${this.props.placeholder}(${selectedIds.length})`;
    }
  }

  searchTextOnchange = (e) => {
    this.setState({searchString: e.target.value});
    if(!e.target.value){
      this.autoScrollHandle(0);
    }
    this.props.searchTextOnchange(e.target.value, (data) => {
      this.autoScrollHandle(this.props.data.rawData.length);
    }); 
  }

  clearSearchText = () => {
    this.props.searchTextOnchange('');
    this.setState({searchString: ''});
    this.autoScrollHandle(this.props.data.rawData.length);
  }

  onToggleCheckAll = () => {
    this.props.toggleCheckAll();
  }

  autoScrollHandle(count){
    $(this.ulNode.current).slimScroll({
      height: count*37 >= 350? 350 : count*37,
      allowPageScroll: false
    });
  }

  render() {
    const {data: { rawData, selectedIds }, toggleCheck, toggleCheckAll} = this.props;
    const placeholder = this.getPlaceHolderText();
    const showSelectAll = false;
    // const showSelectAll = rawData.length !== 0;
    const selectedAll = rawData.length === selectedIds.length;
    let sortData = [];
    rawData.forEach((item) => {
      selectedIds.includes(item._id)?sortData.unshift(item):sortData.push(item);
    });
    const cn = this.state.open ? 'dropdown-menu multi-select-dropdown show' : 'dropdown-menu multi-select-dropdown'    
    return <div className="search-group dropdown-filter" ref={this.groupNode}>
      <input readonly="readonly" value="" type="text" onClick={this.toggleSelection} className="form-control dropdown-toggle" placeholder={placeholder} />
      <ul className={cn}>
        <li className="multi-item filter" value="0">
          <div className="input-group">
            <span className="input-group-addon"><i className="fa fa-search"></i></span>
            <input type="text" value={this.state.searchString} onChange={this.searchTextOnchange} className="form-control multi-search" ref={(dom) => { this.input = dom;}} placeholder="Search" />
            <span onClick={this.clearSearchText} className="input-group-addon"><a className="multi-clear-filter"><i className="mdi-navigation-close"></i></a></span>
          </div>
        </li>
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
          this.state.open ? sortData.map(item => {
            return <li key={item._id}>
              <div className="form-check">
                <label className="form-check-label">
                  <input type="checkbox" className="form-check-input"
                    value={item._id} checked={selectedIds.includes(item._id)} 
                    onChange={() => toggleCheck(item)} />
                  <span>{item._name}</span>
                </label>
              </div>
            </li>
          }) : null
        }
        </div>
      </ul>
    </div>
  }

}

export default DropDownWithSearch