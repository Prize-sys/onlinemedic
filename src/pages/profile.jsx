// Import necessary dependencies
import React, {useEffect, useState, Suspense} from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { useApp } from '../context/appContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faCircleCheck, faCircleQuestion } from '@fortawesome/free-solid-svg-icons'

function Profile() {

  // State to track profile updates
  const [profileUpdate, setProfileUpdate] = useState(false)

  // Effect to handle profile updates (currently does nothing)
  useEffect(() => {
    return undefined
  },[profileUpdate])

  // Get user information from app context
  const { user } = useApp()

  // Determine the appropriate greeting based on the current time
  const day = new Date()
  const time = day.getHours()
  let greet;

  if(time < 12){
    greet = 'Good Morning'
  }else if(time >= 12 && time <= 16){
    greet = 'Good Afternoon'
  }else{
    greet = 'Good Evening'
  }

  return (
    <section className='dashboard'>
      <Suspense fallback={<h1>Loading...</h1>}>
      <div className='user'>
        <div className='user-icon-box'>
          {/* Display user icon */}
          <FontAwesomeIcon icon={faUser} size='6x' className='user-icon'/>
          <div className='email-box'>
            <h5 className='email'>{user.email}</h5>
            <div>
              {/* Display verification status */}
              {user.emailVerified ?
               <FontAwesomeIcon icon={faCircleCheck} size='1x' className='verify-icon'/>:
               <FontAwesomeIcon icon={faCircleQuestion} size='1x' className='unverify-icon'/>
              }
            </div>
          </div>
        </div>
        <div className='user-greet'>
          {/* Display greeting message */}
          <h1>{greet}, {user.displayName !== null ? user.displayName.split(" ")[0] : 'Anonymous'}.</h1>
          <h3>Today is going to be a better day!</h3>
        </div>
      </div>

      <div className='user-tools'>
        <div className='profile-navbar'>
          <div className='profile-nav'>
          {/* Navigation links for different sections */}
          <NavLink
          to='.'
          className='navlink user-profile-link' end>
            Bookings
          </NavLink>

           <NavLink
          to='messages'
          className='navlink user-profile-link'>
            Notifications
          </NavLink> 
          
          
          <NavLink
          to='resources'
          className='navlink user-profile-link'>
            E-books
          </NavLink>
          
          <NavLink
          to='billing'
          className='navlink user-profile-link'>
            Appointment Payment
          </NavLink>

          <NavLink
          to='settings'
          className='navlink user-profile-link'>
            Account Settings
          </NavLink>
          </div>
        </div>
        {/* Render the appropriate child component based on the selected section */}
        <section className='user-profile-outlet'>
           <Outlet  context={ {setProfileUpdate} }/>
        </section>
      </div>
      </Suspense>
    </section>
  )
}

export default Profile