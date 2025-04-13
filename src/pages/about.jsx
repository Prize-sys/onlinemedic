import React from 'react'
import AboutUs from '../components/landingPage/aboutUs'


function About() {
  return (
    <section className='about'>
      <AboutUs aboutPage={true} />
      <div className='section-body'>
        <p>Welcome to OnlineMedic, your trusted digital health companion. We are committed to delivering expert medical guidance, connecting you with certified professionals, and ensuring you have access to quality healthcare—anytime, anywhere.</p>
        
        <p>Our mission is to make healthcare more accessible by breaking down barriers to medical support. Whether you're seeking virtual consultations, expert advice, or reliable health resources, OnlineMedic is here to help.</p>
        
        <p>We believe that timely medical care can make a world of difference. That’s why we offer a seamless platform where users can book appointments, receive online consultations, and access a wealth of health-related insights tailored to their needs.</p>
        
        <p>OnlineMedic values inclusivity, confidentiality, and professionalism. Our platform is designed to cater to diverse health concerns while maintaining the highest ethical standards in patient care.</p>
        
        <p>Whether you need urgent medical attention, ongoing wellness support, or a second opinion, we are here to empower you with the right resources and expert guidance.</p>
        
        <p>Thank you for choosing OnlineMedic. Your well-being is our priority, and we are dedicated to helping you stay informed, healthy, and supported.</p>
      </div>
    </section>
  );
}

export default About