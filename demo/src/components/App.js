import './App.css';
import 'antd/dist/antd.css';

import React, { Component } from 'react';
import LeftSide from './LeftSide';
import defaultInput from '../defaultInput';
import RightSide from './RightSide';
import loadImages from '@nd0ut/ubiquitous-guacamole';

class App extends Component {
  constructor(props, context) {
    super(props, context);

    this.onInputChange = this.onInputChange.bind(this);
    this.process = this.process.bind(this);
  }

  state = {
    input: defaultInput,
    links: defaultInput.split('\n').filter(link => link.length > 0),
    images: [],
    isLoading: false
  };

  onInputChange(input) {
    const links = input.split('\n').filter(link => link.length > 0);
    this.setState({ input, links });
  }

  async process() {
    let loadedImages;
    this.setState({ images: [], isLoading: true });

    try {
      loadedImages = await loadImages(this.state.links);
    } catch (images) {
      loadedImages = images;
    }

    this.setState({ images: loadedImages, isLoading: false });
  }

  render() {
    return (
      <div className="app">
        <div className="app__grid">
          <div className="app__left-side">
            <LeftSide
              onInputChange={this.onInputChange}
              input={this.state.input}
              process={this.process}
            />
          </div>
          <div className="app__right-side">
            <RightSide images={this.state.images} isLoading={this.state.isLoading} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
