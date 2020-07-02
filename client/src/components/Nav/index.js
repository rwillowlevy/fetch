import React from 'react'
import { Link, useLocation } from 'react-router-dom'

function Nav () {
  const { pathname } = useLocation()
  const renderNav = () => {
    if (pathname === '/') {
      return (
        <nav className='navbar navbar-expand-lg navbar-dark red darken-4
        '>
          <a className='navbar-brand' href='/'>
            Fetch
          </a>
        </nav>
      )
    } else {
      return (
        <nav className='navbar navbar-expand-lg navbar-dark bg-primary'>
          <a className='navbar-brand' href='/'>
            else
          </a>
        </nav>
      )
    }
  }
  return renderNav()
}

export default Nav
