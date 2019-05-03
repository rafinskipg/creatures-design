import React from 'react';
import * as canvas from '../lib/launchCanvas'
import * as screenCreateCreatures from '../lib/screenCreateCreatures'
import * as screenCreatureDetail from '../lib/screenCreatureDetail'


class CreatureCreator extends React.Component {
  sketch = null
  componentDidMount() {
    screenCreateCreatures.onClick(this.changeToCreatureDetail.bind(this))
    screenCreatureDetail.onClick(this.changeToCreaturesList.bind(this))

    // First screen
    this.sketch = canvas.init('canvas', screenCreateCreatures)
  }
  changeToCreatureDetail(creature) {
    this.sketch.remove()
    this.sketch = canvas.init('canvas', screenCreatureDetail.forCreature(creature))
  }
  changeToCreaturesList() {
    this.sketch.remove()
    this.sketch = canvas.init('canvas', screenCreateCreatures)
  }
  render() {
    return (
      <div className="canvas-container">
        <div id="canvas"></div>
      </div>
    );
  }
}


export default CreatureCreator;
