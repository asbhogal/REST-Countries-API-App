import React from 'react'
import FilterMenu from './FilterMenu'

describe('<FilterMenu />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<FilterMenu />)
  })
})