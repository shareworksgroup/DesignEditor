import * as React from 'react';
import Editor from './html/react-simple-code-editor';
import { highlight, languages } from './html/prism';
import './html/prism.css';


class Html extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { value, onChange = (value) => { }, style = {} } = this.props;
    style.minHeight = 50;
    return <div style={style}><Editor
      value={value}
      onValueChange={value => onChange(value)}
      highlight={code => { var a = highlight(code, languages.html); console.log(code, a); return a}}
      padding={10}
      style={{
        fontFamily: '"Fira code", "Fira Mono", monospace',
        fontSize: 12,
      }}
    /></div>;
  }
}

export default Html;