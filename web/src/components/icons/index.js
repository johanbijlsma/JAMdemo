import React from 'react'
import HamburgerIcon from './hamburger'
import JamjarIcon from './jamjar'

function Icon (props) {
  switch (props.symbol) {
    case 'hamburger':
      return <HamburgerIcon />
    case 'jamjar':
      return <JamjarIcon />
    default:
      return <span>Unknown icon: {props.symbol}</span>
  }
}

export default Icon
