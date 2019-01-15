import React from 'react';
import styles from './index.less';

const fn = () => {};

class AutoCompletePanel extends React.Component {

  componentDidMount() {
    document.body.addEventListener('click', this.onBodyClick, true);
  }

  
  componentWillUnmount(){
    document.body.removeEventListener('click', this.onBodyClick);
  }

  onBodyClick = () => {
    const { onClose = fn } = this.props;
    setTimeout(onClose, 10);
  }

  onItemClick = (item) => {
    const { onClick = fn } = this.props;
    onClick(item);
  }

  render(){
    const { data = [], show = false, position = { x: 0, y: 0 }, onClick } = this.props;
    return show && data.length > 0 && <div className="dynamic" style={{ left: position.x + 20, top: position.y + 20 }}>
      <ul>
        {data.map(i => (<li key={i.key} onClick={(e)=>{this.onItemClick(i);}} title={i.title}>{i.key}</li>))}
      </ul>
    </div>;
  }
}

export default AutoCompletePanel;