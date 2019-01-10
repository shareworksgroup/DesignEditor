import * as React from 'react';
import {UnControlled as CodeMirror} from 'react-codemirror2';
import 'codemirror/mode/xml/xml';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';

class Html extends React.Component<{value:string, onChange:(value:string)=>{}, style: Object}, {}> {
  constructor(props) {
    super(props);
  }
  render(){
    const { value, onChange = (value:string) => {}, style = {} } = this.props;
    return <div style={style}><CodeMirror
      value={value}
      autoCursor={false}
      options={{
        mode: 'xml',
        lineNumbers: true
      }}
      onChange={(editor, data, value) => {
        onChange(value);
      }}
    /></div>;
  }
}

export default Html;