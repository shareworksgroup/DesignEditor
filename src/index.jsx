import React from 'react'
import ReactDom from 'react-dom'
import Container, { Extension } from './containers/Container';
import Video from './Video';

ReactDom.render(<Container >
  <Video />
</Container>, document.getElementById('root'));