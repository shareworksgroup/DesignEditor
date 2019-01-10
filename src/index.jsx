import React from 'react'
import ReactDom from 'react-dom'
import Container, { Extension } from './containers/Container';
import Video from './Video';
import ConfigButton from './ConfigButton';

let instance = null;

const onPreview = () => {
  if (instance) {
    const page = window.open('', '_blank');
    page.document.write(instance.export());
  }
}

ReactDom.render(<div>
  <Container ref={(obj)=>{ instance = obj; window.instance = obj; }}>
    <Video />
  </Container>
  
  <ConfigButton onPreview={onPreview} />
</div>, document.getElementById('root'));