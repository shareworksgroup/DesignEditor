import React from 'react';
import classnames from 'classnames';

class NoData extends React.Component {
  render() {
    const { height = '100%', className, image = 'no-dashboard', title = 'No result found', info = 'Please try to search again.' } = this.props;
    return <div style={{ height }} className="no-data-content">
      <div className={classnames("no-data", className)}>
        <img src={`../Sources/images/pegman/${image}.png`} />
        <h4>{title}</h4>
        <p>{info}</p>
      </div>
    </div>;
  }
}


export default NoData;