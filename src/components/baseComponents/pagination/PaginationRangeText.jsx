import React from 'react'

class PaginationRangeText extends React.Component {

  render() {
    const {current, pageSize, total} = this.props
    const startIndex = (current - 1) * pageSize
    return <p className="paginate-entries">
      Showing&nbsp;
      <strong>{startIndex}</strong>&nbsp;to&nbsp;
      <strong>{startIndex + pageSize}</strong>&nbsp;of&nbsp;
      <strong>{total}</strong>&nbsp;entries
    </p>
  }

}

export default PaginationRangeText