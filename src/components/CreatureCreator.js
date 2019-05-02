import React from 'react';
import * as canvas from '../lib/launchCanvas'

class CreatureCreator extends React.Component {
  render() {
    return (
      <div className="canvas-container">
        <div id="canvas"></div>
      </div>
    );
  }
  componentDidMount() {
    canvas.init()
  }
}


export default CreatureCreator;
