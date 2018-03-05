import './RightSide.css';
import loadImages from '@nd0ut/ubiquitous-guacamole';

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
              {state === loadImages.State.COMPLETELY_AVAILABLE ? (
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
