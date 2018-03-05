import './RightSide.css';

import React, { Component } from 'react';
import { Spin } from 'antd';

class RightSide extends Component {
  render() {
    return (
      <div className="right-side">
        <div className="right-side__title">Images</div>
        <div className="right-side__image-container">
          {this.props.images.map(([img, state], idx) => (
            <div key={idx} className="right-side__image-wrapper">
              {state === 'loaded' ? (
                <img className="right-side__image" src={img.src} alt=""/>
              ) : (
                <div className="right-side__image right-side__image--failed">FAILED</div>
              )}
            </div>
          ))}
          {
            this.props.isLoading && <Spin size="large" tip="Loading..." />
          }
        </div>
      </div>
    );
  }
}

export default RightSide;
