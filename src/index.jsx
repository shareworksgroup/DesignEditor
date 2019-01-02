import React from 'react'
import ReactDom from 'react-dom'
import Container, { Extension } from './containers/Container';
import { Button } from './containers/extension';

ReactDom.render(<Container >
  <Button />
</Container>
  , document.getElementById('root'));