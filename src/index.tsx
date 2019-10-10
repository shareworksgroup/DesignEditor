import React from 'react';
import ReactDom from 'react-dom';
import Container from './entry';
import Video from './Video';

let instance = null;

ReactDom.render(<div>
  <Container
    imageUploadUrl="http://localhost:3001/UserFeedback/upload"
    onUpload={data => data.fileUrl}
    onUploadError={error => console.log(error.message)}
    onRef={obj => { instance = obj; (window as any).instance = obj; }}>
    <Video />
  </Container>
</div>, document.getElementById('root'));