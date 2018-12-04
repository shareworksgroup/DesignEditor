import React from 'react';
import FancyBox from '../fancybox';

class AttachmentList extends React.Component {

  state = { preview: false, index: 0 };

  preview = (index) => {
    const { files = [] } = this.props;
    this.setState({ preview: true, index });

  }

  render(){
    const { files = [], onRemove = () => {}, other } = this.props;
    return <React.Fragment>
      <ul class="block-section mt0">
        {
          files.map((file, i) => <li key={file.fileUrl}>
            <a class="fancybox-thumb" rel="fancybox-thumb" onClick={(e) => { this.preview(i); e.preventDefault(); }}>
              <img alt="" class="img-responsive" src={file.fileUrl} />
            </a>
            <span title={file.fileName}>{file.fileName}</span>
            <a href="javascript:void(0)" class="attachment-close" onClick={() => { onRemove(file)}}>
              <i class="mdi-content-remove-circle"></i>
            </a>
          </li>)
        }
        {other}
      </ul>
      <FancyBox 
        index={this.state.index}
        images={files.map(i => i.fileUrl)}
        visible={this.state.preview} onClose={()=>{this.setState({ preview:false })}}/>
  </React.Fragment>
  }
}

export default AttachmentList;