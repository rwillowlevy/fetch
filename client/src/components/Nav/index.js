import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Navbar, NavItem, Icon } from 'react-materialize'
import './style.css'

function Nav () {
  const { pathname } = useLocation()
  const renderNav = () => {
    if (pathname === '/') {
      return (
        <nav>
          <div className='nav-wrapper pink darken-2'>
            <a href='/' className='brand-logo'>
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
      )
    } else {
      return (
        <Navbar
          className = 'pink darken-2'
          alignLinks="right"
          brand={<Link className="brand-logo" to='/match'>Fetch</Link>}
          id="mobile-nav"
          menuIcon={<Icon>menu</Icon>}
          options={{
            draggable: true,
            edge: 'left',
            inDuration: 250,
            onCloseEnd: null,
            onCloseStart: null,
            onOpenEnd: null,
            onOpenStart: null,
            outDuration: 200,
            preventScrolling: true
          }}
        >
          <Link to="/match">
            Match
          </Link>
          <Link to="/messages">
            Messages
          </Link>
          <Link to="/profile">
            Profile
          </Link>
          <Link to="/logout">
            Logout
          </Link>
        </Navbar>
      )
    }
  }
  return renderNav()
}

export default Nav
