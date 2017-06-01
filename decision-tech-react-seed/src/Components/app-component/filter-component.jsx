import React from 'react'
import { defaultProductTypeFilterSelections } from '../../data'

const filterOptions = {
  type: Object.keys(defaultProductTypeFilterSelections),
  speed: [
    'ANY',
    76,
    52,
    17
  ]
}

export default class Filter extends React.Component {
  render() {
    return (
      <div>
        <ul>
          {filterOptions.type.map(broadbandType => <li key={broadbandType}>
            <input 
            type="checkbox"
            checked={this.props.selectedBroadbandFilterTypes[broadbandType]}
            onChange={() => this.props.onSelectedBroadbandFilterTypesChange(broadbandType)}/> {broadbandType}
          </li>
          )}
        </ul>
        <div>Speed</div>
        <select value={this.props.selectedSpeed} onChange={(event) => this.props.onSpeedSelect(event.target.value)}>
          {filterOptions.speed.map(speed => <option key={speed} value={speed}>{speed}</option>)}
        </select>
      </div>
    )
  }
}