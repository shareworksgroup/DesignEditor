import React from 'react'

class TableTitle extends React.Component {

  state = {
  }

  render() {
    const {title} = this.props
    return <div class="heading">
      <ul class="list-inline m0">
        <li class="p0">
          <h3 data-bind="text: name">Closed Store Due To Maintenance Issue</h3>
        </li>
      </ul>
      <div class="heading-control hidden-xs">
        <ul class="nav navbar-nav">
          <li>
            <a id="TestExport" data-toggle="tooltip" 
              data-placement="top" title="" data-original-title="Export to Excel">
              <i class="mdi-action-launch"></i>
            </a>
          </li>
        </ul>
      </div>
    </div>
  }
  
}

export default TableTitle