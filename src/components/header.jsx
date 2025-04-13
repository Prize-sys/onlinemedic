import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars , faXmark, faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useApp } from '../context/appContext'
import { toast } from 'react-toastify';

function Header({mobileNav, toggleNav}) {

  // Extracting user and logout function from context
  const { user, logoutUser } = useApp()
  const navigate = useNavigate()

  // State to control the submenu
  const [submenuOpen, setSubmenuOpen] = useState(false);

  // Toggle submenu visibility
  function toggleSubmenu() {
    setSubmenuOpen((prev) => !prev);
  }

  // Function to handle logout
  async function logout(e){
    e.preventDefault() // Prevent default link behavior
    toggleNav(); // Close the mobile navigation
    await logoutUser(); // Logout the user
    toast.success("Logout successful") // Show success toast message
    navigate('.') // Navigate to the homepage
  }

  return (
    <div>
        <nav>

            {/* Logo Section */}
            <div className='nav-logo'>
              <Link className='logo-link' to=".">
                  <h1 className='logo'>Online Medic Platform</h1> {/* Logo text */}
              </Link>
            </div>

            {/* Menu Section for Mobile */}
            <div className='bars-con'>
              {/* Menu Toggle Button */}
              <a className='menu' onClick={toggleNav}>{ mobileNav ? 
                <FontAwesomeIcon className='bars close-bar' icon={faXmark} size='lg' /> : 
                <FontAwesomeIcon className='bars open-bar' icon={faBars} size='lg' />}
              </a>

              {/* Navigation Links */}
              <div className='nav-items' id={mobileNav ? 'collapsible' : ''}>

                {/* Home Link */}
                <NavLink 
                  to="."
                  onClick={toggleNav} 
                  className='navLink homepage'>
                  Home {/* This is the newly added Home link */}
                </NavLink>

                {/* Dashboard Link (only visible when user is logged in) */}
                {user !== null &&
                <NavLink 
                  to="profile"
                  onClick={toggleNav} 
                  className='navLink user-in'>
                  Dashboard
                </NavLink>}

                {/* Book a Session Link (only visible when user is logged in) */}
                {user !== null &&
                <NavLink 
                  to="booking"
                  onClick={toggleNav} 
                  className='navLink user-in'>
                  Book a session
                </NavLink>}

                {/* Who We Are Link (only visible when user is not logged in) */}
                {user === null &&
                <NavLink 
                  to="about"
                  onClick={toggleNav} 
                  className='navLink user-out'>
                  Who We Are
                </NavLink>}

                {/* Smart Therapy Submenu */}
                <div className="navLink submenu-container">
                  <a onClick={toggleSubmenu} className="submenu-trigger">
                    Smart Therapy {submenuOpen ? '↑' : '+'} {/* Toggle symbol */}
                  </a>
                  {submenuOpen && (
                    <div className="submenu">
                      {/* Submenu Items */}
                      <NavLink to="cbtchat" onClick={toggleNav} className="submenu-item">
                        Cognitive Support→
                      </NavLink>
                      <NavLink to="mindchat" onClick={toggleNav} className="submenu-item">
                        Wellness Support→
                      </NavLink>
                      <NavLink to="careerchat" onClick={toggleNav} className="submenu-item">
                        Life Guidance→
                      </NavLink>
                    </div>
                  )}
                </div>

                {/* Login Link (only visible when user is not logged in) */}
                {user === null &&
                <NavLink 
                  to="login"
                  onClick={toggleNav} 
                  className='navLink user-out'>
                  Login
                </NavLink>}

                {/* Logout Link (only visible when user is logged in) */}
                {user !== null &&
                <Link 
                  onClick={logout}
                  className='navLink user-in'>
                  <FontAwesomeIcon  icon={faRightFromBracket} size='1x'/>
                </Link>}
   
              </div>
            </div>
        </nav>
    </div>
  )
}

export default Header;
