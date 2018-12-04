import React from 'react';

class Anchor extends React.Component {

  onClick = () => {
    const { href, onChange = () => {} } = this.props;
    const id = href.replace('#', '');
    if (id) {
      let anchorElement = document.getElementById(id);
      if(anchorElement) { 
        anchorElement.scrollIntoView();
      }
      onChange(href);
    }
  }

  render(){
    const { children, href } = this.props;
    return <a onClick={this.onClick}>{children}</a>;
  }
}

export default Anchor;