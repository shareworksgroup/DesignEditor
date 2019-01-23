import React from 'react';

class Extension extends React.Component {
  
  static check = true;

  
  componentWillUnmount(){
    this.setState = (state,callback)=>{
      return;
    };
  }
  
  
  getIconClass(){}

  getLabel(){}

  getContentType(){}

  toHtml(json){}

  getInitialAttribute(){}

  getProperties(values, update){}
}

export default Extension;