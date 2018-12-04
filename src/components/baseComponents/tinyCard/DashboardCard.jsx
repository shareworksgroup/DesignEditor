import React from 'react';
import classnames from 'classnames';

class DashboardCard extends React.Component {

  defaultConfig = {
    iconClass: 'mdi-image-timelapse',
    title: 'card',
    operations: [],
    hasFilter: false,
    onFilter: () => console.log('onFilter'),
    onFullscreen: () => console.log('onFullscreen'),
    onRefresh: () => console.log('onRefresh'),
    onDelete: () => console.log('onDelete')
  }

  state = {
    fullScreen: false
  }

  chartRef = React.createRef()

  fullScreen = () => {
    const {onFullscreen = this.defaultConfig.onFullscreen} = this.props
    this.setState({fullScreen: true})
    console.log(this.chartRef.current)
    this.chartRef.current.onFullscreen(true)
    setTimeout(() => {
      onFullscreen(true)
    })
  }

  closeFull = () => {
    const {onFullscreen = this.defaultConfig.onFullscreen} = this.props    
    this.setState({fullScreen: false})    
    this.chartRef.current.onFullscreen(false)    
    setTimeout(() => {
      onFullscreen(false)
    })
  }

  render() {
    const {title = this.defaultConfig.title,
      iconClass = this.defaultConfig.iconClass,
      operations = this.defaultConfig.operations, 
      hasFilter = this.defaultConfig.hasFilter,
      onFilter = this.defaultConfig.onFilter,
      onFullscreen = this.defaultConfig.onFullscreen,
      onRefresh = this.defaultConfig.onRefresh,
      onDelete = this.defaultConfig.onDelete,
      Chart} = this.props
    const {fullScreen} = this.state
    const liStyle = {display: fullScreen ? 'block' : 'none'}
    const containerCn = classnames({
      'widget-container': true,
      'db-expand': fullScreen
    })
    const dropdownCn = classnames({
      'dropdown': true,
      'd-none': fullScreen
    })
    return <div className={containerCn}>
      <div className="heading">
        <i className={iconClass}></i><span className="heading-title">{title}</span>
        <div className="heading-control">
          <ul className="nav navbar-nav">
            <li style={liStyle}>
              <a onClick={this.closeFull} href name="smallScreen"><i className="fa fa-compress"></i></a>
            </li>
            <li className={dropdownCn}>
              <a data-toggle="dropdown" className="dropdown-toggle" href>
                <span aria-hidden="true" className="fa fa-ellipsis-v"></span>
              </a>
              <div className="dropdown-menu dropdown-menu-right">
                {
                  hasFilter ? <a onClick={onFilter} href className="dropdown-item">Filter</a> : null
                }
                <a onClick={this.fullScreen} href className="dropdown-item" name="fullScreen">Fullscreen</a>
                <a onClick={onRefresh} href className="dropdown-item">Refresh</a>
                <div className="dropdown-divider"></div>
                <a onClick={onDelete} href className="dropdown-item text-danger">Delete</a>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div className="widget-content">
        {/* {this.props.children} */}
        <Chart ref={this.chartRef} />
      </div>
    </div>
  }
}

export default DashboardCard