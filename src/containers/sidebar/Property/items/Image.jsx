import React from 'react';
import axios from 'axios';
import { Line } from 'rc-progress';
import { Config, generateIncressTimer, imgCheck } from '../../../../lib/util';

class Image extends React.Component {

  state = {
    uploading: false,
    progress: 0,
  }

  componentDidMount() {
    this.timerGenerate = generateIncressTimer(0, 100);
    if (this.dropzone) {
      this.dropzone.addEventListener('drop', this.onDrop);
      this.dropzone.addEventListener('dragenter', this.onPrevent);
      this.dropzone.addEventListener('dragover', this.onPrevent);
    }
  }

  componentWillUnmount() {
    if (this.dropzone) {
      this.dropzone.removeEventListener('drop', this.onDrop);
      this.dropzone.removeEventListener('dragenter', this.onPrevent);
      this.dropzone.removeEventListener('dragover', this.onPrevent);
    }
  }

  onPrevent = (e) => {
    e.stopPropagation();
    e.preventDefault();
  }

  onDrop = (e) => {
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      this.onChange({ target: { files } });
    }
  }

  onChange = (e) => {
    if (this.state.uploading) {
      return;
    }
    const target = e.target;
    const { attribute = 'url', onUpdate = () => { } } = this.props;
    const file = e.target.files[0];
    if (!file || !imgCheck(file.name)) {
      return;
    }
    var formData = new FormData();
    formData.append('img', file, file.name);
    let config = {
      headers: { 'Content-Type': 'multipart/form-data' }
    };
    this.setState({ uploading: true });
    const timer = this.timerGenerate(5, (progress) => {
      this.setState({ progress });
    });
    axios.post(Config.get('imageUploadUrl'), formData, config).then(response => {
      this.setState({ progress: 100 });
      timer.stop();
      setTimeout(() => {
        this.setState({ uploading: false, progress: 0 });
      }, 200);
      onUpdate(attribute, Config.get('onUpload')(response.data));
    }).catch(error => { 
      console.log(error);
      timer.stop();
      target.value = null;
      Config.get('onUploadError')(error);
      this.setState({ progress: 0, uploading: false });
    });
  }

  render() {
    const { title = 'Image', desc } = this.props;
    return (<div className="blockbuilder-widget blockbuilder-link-widget">
      <div className="row">
        <div className="blockbuilder-widget-label col-6">
          <label className="blockbuilder-label-primary"><span>{title}</span></label>
        </div>
        <div className="col-6 text-right">
          <label htmlFor={this.state.uploading ? '' : 'fileInput'} style={{ color: '#007bff', fontSize: '12px', cursor: 'pointer' }}>Upload Image</label>
        </div>
      </div>
      <div className="row" style={{ marginTop: 10 }}>
        <div className="col-12">
          <label
            ref={(dom) => { this.dropzone = dom; }}
            className="blockbuilder-dropzone" aria-disabled="false" htmlFor={this.state.uploading ? '' : 'fileInput'}>
            <div>
              {!this.state.uploading && <span>Drop a new image here, or click to select files to upload.</span>}
              {this.state.uploading && <div>
                <p style={{ fontSize: '12px' }}>UPLOADING</p>
                <Line percent={this.state.progress} strokeWidth="3" strokeColor="#0BD318" />
              </div>}
            </div>
            <input id="fileInput" onChange={this.onChange} type="file" accept="image/*" autoComplete="off" style={{ display: 'none' }} />
          </label>
          {desc && <div className="blockbuilder-widget-hint">
            {desc}
          </div>}
        </div>
      </div>
    </div>);
  }
}

export default Image;