import 'isomorphic-fetch'
var fetchMock = require('fetch-mock')
import React from 'react'
import Filter from './filter-component'
import renderer from 'react-test-renderer'
import { defaultProductTypeFilterSelections } from '../../data'

test('Snapshot test for filter component', () => {

fetch.mockResponse(JSON.stringify({deals: [{name: 'x'}] }))

  const component = renderer.create(
    <Filter selectedBroadbandFilterTypes={defaultProductTypeFilterSelections}/>
  );
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
});