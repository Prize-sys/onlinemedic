// Import necessary dependencies
import React from 'react'
import styles from '../assets/styles/policy.module.css'
import Animated from '../components/animations/animated'
import privacyImg from '../assets/images/privacy.webp'
import PrivacyPolicyContainer from '../components/privacyPolicy'

function Policy() {
  return (
    <section className='policy'>
        {/* Main container for policy section */}
        <div className={styles.policy}>
        <Animated y={true} className={styles.policy}>
            <div className={styles.policyContentWrapper}>
                {/* Privacy policy image */}
                <div className={styles.image}>
                    <img src={privacyImg} alt="Who We Are" className={styles.policyImage} />
                </div>
                {/* Privacy policy headline */}
                <div className={styles.headline}>
                    <h2>Privacy Policy</h2>
                </div>
            </div>
        </Animated>
        </div>
        {/* Privacy policy content section */}
        <div className='section-body'>
            <PrivacyPolicyContainer />
        </div>
    </section>
  )
}

export default Policy
