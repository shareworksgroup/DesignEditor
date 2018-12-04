import React from 'react'
import Pagination from 'rc-pagination'
import Select from 'rc-select'

class CustomPagination extends React.Component {

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

  state = {
    totalItemCount: 1000,
    pageSize: 12,
    pageNumber: 1
  }

  onPageDataChange = (page, pagesize) => {
    console.log(page, pagesize)
    this.setState({
      pageNumber: page
    })
  }

  componentDidMount() {
  }

  render() {
    const paginationData = this.state
    return <Pagination
      // showTotal={(total, range) => `${range[0]} - ${range[1]} of ${total} items`}
      showTotal={(total, range) => `Showing ${range[0]} to ${range[1]} of ${total} entries`}
      total={paginationData.totalItemCount}
      selectComponentClass={Select}
      // showSizeChanger
      pageSizeOptions={this.pageSizeOptions}
      pageSize={paginationData.pageSize}
      current={paginationData.pageNumber}
      onShowSizeChange={this.onPageDataChange}
      onChange={this.onPageDataChange}
      locale={this.localeData}
    />
  }

}

export default CustomPagination