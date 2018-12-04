import React from 'react'

class PriorityLabel extends React.Component {

  getLabelContent() {
    switch (this.props.PriorityId) {
      case 1:
        return <span class="priority label label-danger">2H</span>
      case 2:
        return <span class="priority label label-pink">4H</span>
      case 3:
        return <span class="priority label label-warning">1D</span>
      case 4:
        return <span class="priority label label-primary">2D</span>
      case 5:
        return <span class="priority label label-info">7D</span>
      case 6:
        return <span class="priority label label-success">2W</span>
      case 7:
        return <span class="priority label label-default">Ur</span>
      case 8:
        return <span class="priority label label-grey">Ex</span>
      case 9:
        return <span class="priority label label-lightgrey">St</span>
    }
  }

  render() {
    return this.getLabelContent()
  }
}

export default PriorityLabel