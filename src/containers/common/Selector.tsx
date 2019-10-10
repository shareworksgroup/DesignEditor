import React from 'react';
import classnames from 'classnames';

class Selector extends React.Component<ISelectorProps> {

  dragDom: HTMLDivElement;

  componentDidMount() {
    const { onRef = () => { } } = this.props;
    if (this.dragDom) {
      onRef(this.dragDom);
    }
  }
  render() {
    const { placeholder = "Row", type = "row", onDelete = () => { }, onCopy = () => { } } = this.props;
    return <div className="ds-layer-selector">
      <div className="ds-layer-type">{placeholder}</div>
      <div
        ref={dom => { this.dragDom = dom; }}
        className={classnames("ds-layer-drag", type === 'row' ? 'ds-layer-drag-rows' : 'ds-layer-drag-contents')}
      >
        <i className="icon icon-move" />
      </div>
      <div className="ds-layer-controls ds-layer-controls-rows">
        <div style={{ display: 'inline' }}>
          <a className="ds-layer-control ds-delete" onClick={onDelete}>
            <i className="icon icon-trash" />
          </a>
        </div>
        <div style={{ display: 'inline' }}>
          <a className="ds-layer-control" onClick={onCopy}>
            <i className="icon icon-copy" />
          </a>
        </div>
      </div>
    </div>;
  }
}

interface ISelectorProps {
  placeholder?: string;
  type?: string;
  onDelete?: () => void;
  onCopy?: () => void;
  onRef?: (dragDom: HTMLDivElement) => void;
}

export default Selector;