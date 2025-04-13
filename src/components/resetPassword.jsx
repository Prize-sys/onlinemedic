import React, { useState } from 'react'; // Import React and useState hook
import styles from '../assets/styles/resetPassword.module.css'; // Import CSS module for styling
import { useApp } from '../context/appContext'; // Import custom app context hook
import errorRegex from '../utils/regex'; // Import utility for error handling
import { toast } from 'react-toastify'; // Import toast notifications

function ResetPasswordModal({ isOpen, onClose }) {
  
  const [email, setEmail] = useState(''); // State to store email input value
  const [error, setError] = useState(() => null); // State to store error messages
  const [action, setAction] = useState(false); // State to track submit action progress
  const { resetPassword } = useApp(); // Get resetPassword function from app context

  // Function to handle form submission
  async function handleSubmit(e){
    e.preventDefault();

    try{
      setAction(true); // Disable button while request is processing
      await resetPassword(email); // Call resetPassword function
      toast.success("Check Mail Inbox for Instructions"); // Display success notification
      onClose(); // Close modal after successful request
    }catch(e){
      setError(errorRegex(e.message)); // Set error message based on regex validation
      toast.warning("Error Resetting Password"); // Show warning toast
      setTimeout(() => {
        setError(null);
        setEmail(''); // Clear email input after 3 seconds
      }, 3000);
    }finally{
      setAction(false); // Re-enable button after request completes
    }
  }

  if (!isOpen) return null; // If modal is not open, return null

  return (
    <div className={styles.modalOverlay}> {/* Modal background overlay */}
      <div className={styles.modal}> {/* Modal container */}
        
        {/* Close button */}
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>
        
        <h2 className={styles.heading}>Reset Password</h2> {/* Modal heading */}
        
        <form onSubmit={handleSubmit} className={styles.form}> {/* Password reset form */}
          <label htmlFor="email" className={styles.label}> {/* Email input label */}
            Email Address
          </label>
          
          {error && <h5 className='error red'>{error}</h5>} {/* Display error message if exists */}
          
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
            required
          />
          
          <div>
            <button disabled={action === true} type="submit" className={styles.submitButton}> {/* Submit button */}
              Reset Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ResetPasswordModal; // Export component for use in other parts of the app
