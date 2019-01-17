import React from 'react';
import classnames from 'classnames';

class Selector extends React.Component {
  componentDidMount() {
    const { onRef = () => {} } = this.props;
    if (this.dragDom) {
      onRef(this.dragDom);
    }
  }
  render() {
    const { placeholder = "Row", type = "row", onDelete = () => {}, onCopy = () => {} } = this.props;
    return <div className="blockbuilder-layer-selector">
      <div className="blockbuilder-layer-type">{placeholder}</div>
      <div ref={(dom) => { this.dragDom = dom; }} className={classnames("blockbuilder-layer-drag", type==='row' ? 'blockbuilder-layer-drag-rows' :  'blockbuilder-layer-drag-contents') }>
        <i className="icon icon-move" />
      </div>
      <div className="blockbuilder-layer-controls blockbuilder-layer-controls-rows">
        <div style={{display:'inline'}}>
          <a className="blockbuilder-layer-control blockbuilder-delete" onClick={onDelete}>
            <i className="icon icon-trash" />
          </a>
        </div>
        <div style={{display:'inline'}}>
          <a className="blockbuilder-layer-control" onClick={onCopy}>
            <i className="icon icon-copy" />
          </a>
        </div>
      </div>
    </div>;
  }
}

export default Selector;