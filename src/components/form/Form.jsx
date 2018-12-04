import React from 'react'
import Pagination from 'rc-pagination'
import Select from 'rc-select'
import FormThead from './FormThead'
import classnames from 'classnames'
import DefaultTableRowRender from './TableRowRender'
const mobxReact = require('mobx-react')

class Form extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() { 
  }

  localeData = {
    // Options.jsx
    items_per_page: '/ page',
    jump_to: 'Goto',
    jump_to_confirm: 'confirm',
    page: '',
  
    // Pagination.jsx
    prev_page: 'Previous Page',
    next_page: 'Next Page',
    prev_5: 'Previous 5 Pages',
    next_5: 'Next 5 Pages',
    prev_3: 'Previous 3 Pages',
    next_3: 'Next 3 Pages'
  }

  pageSizeOptions = ['12', '20', '50', '100']

  onPageDataChange = (current, pageSize) => {
    const {changePageSize, changePageNumber} =  this.props.tableState    
    changePageSize(pageSize)
    changePageNumber(current)
  }

  render() {
    const {TableRowRender, TableOperation, sortState, tableState} = this.props
    const {theadData, sortedTheadData, changeSortState} = sortState
    const {tableContent, paginationData, loading} = tableState
    const loadingCn = classnames({'spinner-content': true, 'hide': !loading})
    return (
      <div className="widget-container fluid-height clearfix">
        {
          tableContent.length === 0 ? <div className="no-data-content">
            <div className="no-data">
              <img src="/Sources/images/pegman/blank.png" />
              <h4>No results found</h4>
              <p>Please try to search again.</p>
            </div>
          </div> : null
        }

        {
          tableContent.length > 0 ? 
          <div className="widget-content" data-bind="if:items().length>0">
            <div className={loadingCn}>
              <div className="loader"></div>
            </div>
            <div className="row">
              <div className="col-md-6 col-xs-12 mb-10">
                <label className="page-select">
                </label>
              </div>
              <div className="col-md-6 col-xs-12">
                <div className="pull-right">
                  <TableOperation />
                </div>
              </div>
            </div>

            <div className="table-responsive-vertical">
              <table className="table table-striped table-condensed table-hover table-bordered">
                <FormThead sortedTheadData={sortedTheadData} changeSortState={changeSortState}/>
                {
                  TableRowRender ? <TableRowRender tableContent={tableContent} theadData={theadData}/> :
                   <DefaultTableRowRender tableContent={tableContent} theadData={theadData}/>
                }
              </table>
            </div>

            <div className="custom-pagination-wrapper">
              <Pagination
                showTotal={(total, range) => `${range[0]} - ${range[1]} of ${total} items`}
                total={paginationData.totalItemCount}
                selectComponentClass={Select}
                showSizeChanger
                pageSizeOptions={this.pageSizeOptions}
                pageSize={paginationData.pageSize}
                current={paginationData.pageNumber}
                onShowSizeChange={this.onPageDataChange}
                onChange={this.onPageDataChange}
                locale={this.localeData}
              />
            </div>
          </div> : null
        }

      </div>
    )
  }
}

export default mobxReact.observer(Form)