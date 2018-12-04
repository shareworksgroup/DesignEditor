import React from 'react'
class Operations extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    const {onSearch, onAdvance, onClear} = this.props
    return (
      <div className="search-group">
        <button type="button" onClick={onSearch} id="btn-search" className="btn btn-primary btn-long btn-sm mr-8">
          <i className="fa fa-search"></i>
        </button>
        <button onClick={onAdvance} type="button" className="btn btn-sm btn-primary mr-8" data-toggle="modal" data-target="#advanSearch" data-bind="css: {'btn-magenta': isAdvanceSearch, 'btn-primary': !isAdvanceSearch()}">
          <i className="fa fa-bars"></i>
        </button>
        <div className="btn-group" id="filterContainer">
          <button type="button" className="btn btn-primary btn-sm dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
            name="OpenFilterContainerBtn" data-bind="click: filterContext.filterListContext.render.bind(filterContext.filterListContext)">
            <i className="fa fa-filter"></i>
          </button>
          <div id="management_filterContainer">
            <div id="filter_management_model_management_filterContainer" style={{display: 'none'}} data-bind="with: filterContext.filterListContext.filterManagementContext">
            </div>
          </div>
        </div>
        {/* <button type="button" onClick={onClear} name="AdvClearFilerSearchBtn" class="btn btn-default btn-sm m0">
          <i class="fa fa-undo"></i>
        </button> */}
      </div>
    )
  }
}

export default Operations