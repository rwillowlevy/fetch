import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Modal } from 'react-materialize'

function Nav () {
  const { pathname } = useLocation()
  const renderNav = () => {
    if (pathname === '/') {
      return (
        <>
        <nav>
          <div className='nav-wrapper light-blue darken-1'>
            <a href='#' className='brand-logo'>
              Fetch
            </a>
            <ul id='nav-mobile' className='right'>
              <li>
                <a className='modal-trigger' href='#modal1'>
                  Login
                </a>
              </li>
            </ul>
          </div>
        </nav>
        </>
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
