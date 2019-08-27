import { Upload, Icon, message } from 'antd';
import React, { Component } from 'react';


function getBase64(img:any, callback:Function) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file:any) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
}


interface UploadAvatarPros {
  uploadFinished:Function;
}

class UploadAvatar extends Component<UploadAvatarPros> {
  state = {
    loading: false,
    imageUrl: '',
  };

  handleChange = (info:any) => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      const { uploadFinished } = this.props;
      getBase64(info.file.originFileObj, (imageUrl:string) => {
        this.setState({
          imageUrl,
          loading: false,
        });
        },
      );
      uploadFinished(info.file.response.url);
    }
  };

  render() {
    const uploadButton = (
      <div>
        <Icon type={ this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const { imageUrl } = this.state;
    return (
      <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        action="http://msfs.xiaominfc.com/"
        beforeUpload={beforeUpload}
        onChange={this.handleChange}
      >
        {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
      </Upload>
    );
  }
}

export default UploadAvatar;
