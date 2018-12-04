import React from 'react'

class RangeLinter extends React.Component {

  render() {
    const {total, pageSize, current} = this.props.tablePagination
    const startIndex = pageSize * (current - 1) + 1
    const endIndex = startIndex + pageSize - 1
    return <p class="paginate-entries">
      Showing&nbsp;
      <strong>{startIndex}</strong>&nbsp;to&nbsp;
      <strong>{endIndex}</strong>&nbsp;of&nbsp;
      <strong>{total}</strong>&nbsp;entries
    </p>
  }
  
}

export default RangeLinter