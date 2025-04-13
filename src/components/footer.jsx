import React from 'react'
import styles from '../assets/styles/footer.module.css'
import { Link as ScrollLink } from 'react-scroll';
import { useNavigate, Link } from 'react-router-dom';
import { IconContext } from 'react-icons';
import {FaFacebookSquare, FaInstagramSquare, FaLinkedin} from 'react-icons/fa'

function Footer() {

  const navigate = useNavigate();

  function handleNavigation(sectionId){
    return navigate('/', { state: { sectionId } }); 
  };


    return (
        <footer className={styles.footer}>
          <div className={styles.footerContainer}>
            <div className={styles.linksSection}>
              <h4>Quick Links</h4>
              <ul>
                <li><ScrollLink                 to="about"
                smooth={true}
                duration={500}
                onClick={() => handleNavigation('about')}>Who We Are</ScrollLink></li>
                <li><ScrollLink                 to="services"
                smooth={true}
                duration={500}
                onClick={() => handleNavigation('services')}>Expert Care Offerings</ScrollLink></li>
                <li><ScrollLink                 to="faqs"
                smooth={true}
                duration={500}
                onClick={() => handleNavigation('faqs')}>Support & Guidance</ScrollLink></li>
                <li><ScrollLink                 to="contact"
                smooth={true}
                duration={500}
                onClick={() => handleNavigation('contact')}>Get in Touch</ScrollLink></li>
                <li><Link                 to="privacypolicy"
                >Privacy Policy</Link></li>
              </ul>
            </div>
    
            <div className={styles.contactSection}>
              <h4>Get In Touch</h4>
              <p>Email: neversonprize@gmail.com</p>
              <p>Phone: +2547434342054</p>
              <p>Address: USIU Road</p>  
            </div>
    
            <div className={styles.socialSection}>
              <h4>Connect with Us</h4>
              <div className={styles.socialIcons}>
                <IconContext.Provider value={{size: "1.5rem"}}>
                <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebookSquare /></a>
                <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagramSquare /> </a>
                <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
                </IconContext.Provider>
              </div>
            </div>
          </div>
    
          <div className={styles.copyright}>
            <p>&copy; {new Date().getFullYear()} OnlineMedic. All rights reserved. <a href="https://pnotechsolutions.co.ke" target="_blank" rel="noopener noreferrer">
             Developed by PNO TECH SOLUTIONS</a>
            </p>
          </div>
        </footer>
      )
}

export default Footer