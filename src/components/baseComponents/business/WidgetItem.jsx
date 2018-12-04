import React from 'react'

class WidgetItem extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    const {text = 'High Priority', type} = this.props
    const pre = '../../sources/images/dashboardWidget/'
    const imgSrc = `${pre}${type}.png`
    return <div className="thumbnail">
      <img src={imgSrc} />
      <div className="caption">
        <h5>{text}</h5>
        <p><a href className="btn btn-light d-block" role="button" name="addWidgetBtn" 
          data-loading-text="Adding..." data-complete-text="<i className='fa fa-check'></i>">Add to Dashboard</a></p >
      </div>
    </div>
  }

}

export default WidgetItem