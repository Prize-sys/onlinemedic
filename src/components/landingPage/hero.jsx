import React from 'react'
import { Link } from 'react-router-dom'
import styles from '../../assets/styles/landingPage/hero.module.css'
import heroImg from '../../assets/images/onlinemedic.gif'
import Animated from '../animations/animated'


function Hero({ user }) {
  return (
    <div className={styles.heroContainer}>
      <div className={styles.heroText}>
        <Animated y={true} className={styles.heroText}>
        <h1 className={styles.heroHeading}>
            Nurture Your Well-Being, Step Into Growth
        </h1>
        <div className={styles.heroParagraph}>
            <p> 
              Find comfort and guidance through expert-led online therapy tailored just for you. Our platform provides a safe and inclusive space to heal, grow, and achieve lasting mental wellness with compassionate support every step of the way.
            </p>
        </div>
        <div>
          <Link to={user !== null ? 'booking' : 'signup'}>
              <button className={`button ${styles.heroButton}`}>{ user !== null ? 'Book A Session' : 'Contact Us Today'}</button>
          </Link></div>
        </Animated>
      </div>
      <div className={styles.heroImage}>
        <img src={heroImg} alt="Hero Background" />
      </div>
    </div>
  )
}

export default Hero