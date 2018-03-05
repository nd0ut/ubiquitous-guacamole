import './LeftSide.css';

import { Button, Icon } from 'antd';
import React, { Component } from 'react';
import AceEditor from 'react-ace';
import 'brace/mode/plain_text';
import 'brace/theme/vibrant_ink';

class LeftSide extends Component {
  render() {
    return (
      <div className="left-side">
        <div className="left-side__header">
          <div className="left-side__title">Links</div>

          <Button type="primary" size="large" onClick={this.props.process}>
            Process
            <Icon type="right" />
          </Button>
        </div>

        <AceEditor
          mode="plain_text"
          theme="vibrant_ink"
          onChange={this.props.onInputChange}
          value={this.props.input}
          width={''}
        />
      </div>
    );
  }
}

export default LeftSide;
