import React from 'react'
import ReactDom from 'react-dom'
import Container, { Extension } from './index.js';
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
  <Container
    imageUploadUrl="http://localhost:3001/NewUserFeedback/upload"
    mentions={[
      { key: 'aaa', title: 'aaa' },
    ]}
    onUpload={ data => data.fileUrl }
    onUploadError={ error => console.log(error.message) }
    onRef={(obj) => { instance = obj; window.instance = obj; }}>
    <Video />
  </Container>

  <ConfigButton onPreview={onPreview} />
</div>, document.getElementById('root'));