import React from 'react'

class PriorityLabel extends React.Component {

  getLabelContent() {
    switch (this.props.PriorityId) {
      case 1:
        return <span class="priority badge badge-danger">2H</span>
      case 2:
        return <span class="priority badge badge-pink">4H</span>
      case 3:
        return <span class="priority badge badge-warning">1D</span>
      case 4:
        return <span class="priority badge badge-primary">2D</span>
      case 5:
        return <span class="priority badge badge-info">7D</span>
      case 6:
        return <span class="priority badge badge-success">2W</span>
      case 7:
        return <span class="priority badge badge-default">Ur</span>
      case 8:
        return <span class="priority badge badge-grey">Ex</span>
      case 9:
        return <span class="priority badge badge-lightgrey">St</span>
    }
  }

  render() {
    return this.getLabelContent()
  }
}

export default PriorityLabel