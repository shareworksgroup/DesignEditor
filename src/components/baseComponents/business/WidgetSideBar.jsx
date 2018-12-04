import React from 'react'

class WidgetSideBar extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    const {data} = this.props
    return <div className="widget-sidebar">
      <div className="input-group">
        <div className="input-group-prepend">
          <div className="input-group-text"><i className="fa fa-search"></i></div>
        </div>
        <input type="text" className="form-control" placeholder="Search..." />
      </div>
      <ul className="normal-list">
        <li className="normal-heading">Categories</li>
        <li className="active"><a href=" ">All</a><span className="badge">55</span></li>
        <li><a href="javascript:void(0);">WO Issues</a><span className="badge">9</span></li>
        <li><a href="javascript:void(0);">WO Status</a><span className="badge">16</span></li>
        <li><a href="javascript:void(0);">Call Request</a><span className="badge">6</span></li>
        <li><a href="javascript:void(0);">WO Flag</a><span className="badge">12</span></li>
        <li><a href="javascript:void(0);">Aggregate Statistics</a><span className="badge">12</span></li>
        <li className="normal-heading"><hr /></li>
      </ul>
    </div>
  }

}

export default WidgetSideBar