// Import necessary dependencies
import React, { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom';
import { scroller } from 'react-scroll';
import { useApp } from '../context/appContext'
import Services from '../components/landingPage/services';
import Testimonials from '../components/landingPage/testimonials';
import AboutUs from '../components/landingPage/aboutUs';
import Contact from '../components/landingPage/contact';
import Faqs from '../components/landingPage/faqs';
import Hero from '../components/landingPage/hero';
import CTA from '../components/landingPage/cta';

function Homepage() {

  // Get user and loading state from app context
  const { user, isLoading } = useApp()
  
  // Get the current location object
  const location = useLocation();

  // Effect to scroll to a specific section if provided in location state
  useEffect(() => {
    if (location.state && location.state.sectionId) {
      scroller.scrollTo(location.state.sectionId, {
        smooth: true,
        duration: 500,
      });
    }
  }, [location.state]);

  return (
    <div>

      {/* Hero Section with user information */}
      <Hero user={user}/>

      {/* About Us Section */}
      <section id="about"><AboutUs /></section>

      {/* Services Section */}
      <section id="services"><Services /></section>

      {/* Call to Action Section */}
      <CTA user={user}/>

      {/* Contact Section */}
      <section id="contact"><Contact /></section>
    </div>
  )
}

export default Homepage
