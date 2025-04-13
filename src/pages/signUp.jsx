import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useApp } from '../context/appContext'
import errorRegex from '../utils/regex.js'
import { toast } from 'react-toastify';

function SignUp() {

  const navigate = useNavigate()

  // State variables for form input values
  const [formDetails, setFormDetails] = useState({
    email:'',
    password:'',
    passwordConfirm:'',
    agreement: false, // Tracks whether the user agrees to the privacy policy
  })
  
  const [action, setAction] = useState(false) // Tracks whether the sign-up process is in progress

  // State variable for form error messages
  const [error, setError] = useState(() => null)

  // Values from the app context (authentication-related functions)
  const { createNewUser, addNewUser, user } = useApp()

  // Function to handle changes in form input fields
  function formChanges(event){

    event.preventDefault(); // This is unnecessary here and can be removed

    const {name, value, type, checked} = event.target
    setFormDetails(prevState => {
        return {
            ...prevState,
            [name]: type === 'checkbox' ? checked : value // Handles both text input and checkbox changes
        }   
    })
  }

  // Function to handle form submission and sign-up process
  async function handleSignUp(event){
      event.preventDefault();

      // Ensure the user agrees to the privacy policy before proceeding
      if (!formDetails.agreement) {
        setError('You must agree to the privacy policy to sign up.');
        return; 
      }

      // Validate if passwords match before proceeding
      if(formDetails.password === formDetails.passwordConfirm){
          try{
            setAction(true); // Indicate that the sign-up process is in progress
            const getUser = await createNewUser(formDetails.email, formDetails.password); 
            await addNewUser(getUser.user.uid);  
            toast.success("Account successfully created");
            
            // Redirect to the profile page after a short delay
            setTimeout(() => navigate('/profile', { replace: true }), 200);
          }catch(e){
            setError(errorRegex(e.message)) // Handle and display errors
          }finally{
            setAction(false); // Reset loading state
          }
      }else{
        setError('Passwords do not match') // Display error if passwords do not match
      }
  }

  // Redirect the user to the profile page if they are already logged in
  useEffect(() => {
      if (user) {
        navigate('/profile', { replace: true });
      }
  }, [user, navigate]);

  return (
    <section className='forms'>

      <h1 className='form-header'>Sign-Up for an Account</h1>

      <form onSubmit={handleSignUp}>

        {error && <h5 className='error red'>{error}</h5>} {/* Display error messages if any */}

        <div className='input-holder'>
          <label htmlFor="email">Email</label>
          <input 
            type="email" 
            placeholder="Email Address" 
            name="email" 
            id="email" 
            className='input'
            onChange={formChanges}
            value={formDetails.email}
            required />
        </div>

        <div className='input-holder'>
          <label htmlFor="password">Password</label>
          <input 
            type="password" 
            placeholder="Password" 
            name="password" 
            id="password" 
            className='input'
            onChange={formChanges}
            value={formDetails.password}
            required
            minLength='6'
            maxLength='18' />
        </div>

        <div className='input-holder'>
          <label htmlFor="confirm-pw">Confirm Password</label>
          <input 
            type="password" 
            placeholder="Enter Password Again" 
            name="passwordConfirm" 
            id="confirm-pw" 
            className='input'
            onChange={formChanges}
            value={formDetails.passwordConfirm}
            required
            minLength='6'
            maxLength='18' />
        </div>

        <div className='optional agreed'>
          <input 
              type="checkbox" 
              checked={formDetails.agreement} 
              name="agreement" 
              id="agreement"
              className='agreement' 
              onChange={formChanges}
              required />
          <p>I have read and agreed to the <Link to="/privacypolicy">Privacy Policy</Link></p>
        </div>

        <button className='button' type="submit">
          {action ? 'SIGNING UP...' : 'SIGN UP'} {/* Change button text when signing up */}
        </button>

        <div className='optional'>
          <p>Already have an account? <Link to="/login">Login</Link></p>
        </div>
      </form>
    </section>
  )
}

export default SignUp
