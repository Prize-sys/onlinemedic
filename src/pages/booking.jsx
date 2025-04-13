import { serverTimestamp } from 'firebase/firestore';
import React from 'react';
import { Form, redirect, useNavigation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getRandomNumber } from '../utils/randomNumber';

// Handles the booking process and session allocation
export const action = (userContext) => async ({ request }) => {
  // Extract form data from the request
  const formData = await request.formData();
  const { user, addNewBooking, globalAddNewBooking, getLinks } = userContext;

  try {
    // Fetch available virtual session links from the database
    const availableSessions = await getLinks();
    
    // Select a random session if available, otherwise assign a temporary session link
    let selectedSession = availableSessions?.length
      ? availableSessions[getRandomNumber() % availableSessions.length]
      : { sessionLink: `https://meet.google.com/new`, sessionId: `temp-${Date.now()}` };

    // Construct booking details using form input values
    const newBooking = {
      timing: serverTimestamp(), // Stores the timestamp of booking
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      therapyType: formData.get('therapyType'),
      appointmentDate: formData.get('date'),
      time: formData.get('time'),
      sessionDuration: formData.get('sessionDuration'),
      preferredTherapist: formData.get('preferredTherapist') || "Any Available",
      reason: formData.get('reason'),
      comments: formData.get('comments'),
      sessionLink: selectedSession.sessionLink, // Assigned session link
      sessionId: selectedSession.sessionId // Assigned session ID
    };

    // Save booking in the user's personal records
    const createdBooking = await addNewBooking(user.uid, newBooking);
    const bookingID = createdBooking.id; // Retrieve booking ID

    // Store booking in the global collection for reference
    await globalAddNewBooking({
      ...newBooking,
      userID: user.uid,
      appointmentID: bookingID,
    });

    // Show success message and redirect to booking details page
    toast.success("Appointment successfully booked!");
    return redirect(`/booking/${user.uid}/${bookingID}`);
  } catch (err) {
    console.error("Booking failed:", err);
    toast.error("Unable to complete booking. Try again.");
    return null;
  }
};

// Appointment Booking Form Component
function Booking() {
  const navigation = useNavigation(); // Manage navigation state

  return (
    <section className='forms'>
      <h1 className='form-header'>Schedule a Virtual Therapy Session</h1>
      <p className='info-text'>All sessions are conducted online via Google Meet.</p>

      <Form method='post' id='booking'>

        {/* Input field for user's name */}
        <div className='input-holder'>
          <label htmlFor="name">Your Name</label>
          <input type="text" name="name" id="name" placeholder="John Doe" maxLength="50" required className='input' />
        </div>

        {/* Input field for email address */}
        <div className='input-holder'>
          <label htmlFor="email">Email Address</label>
          <input type="email" name="email" id="email" placeholder="john@example.com" required className='input' />
        </div>

        {/* Input field for phone number */}
        <div className='input-holder'>
          <label htmlFor="phone">Phone Number</label>
          <input type="tel" name="phone" id="phone" placeholder="0720000000" required minLength="8" maxLength="15" className='input' />
        </div>

        {/* Radio buttons for selecting therapy type */}
        <fieldset className='radio-box'>
          <legend>Type of Therapy</legend>
          <div className="radio-holder">
            <input type="radio" id="cognitive" name="therapyType" value="cognitive-behaviour" required className='radio' />
            <label htmlFor="cognitive">Cognitive Support</label>
          </div>
          <div className="radio-holder">
            <input type="radio" id="mindfulness" name="therapyType" value="mindfulness-based" required className='radio' />
            <label htmlFor="mindfulness">Wellness Support</label>
          </div>
          <div className="radio-holder">
            <input type="radio" id="careerLife" name="therapyType" value="career & life coaching" required className='radio' />
            <label htmlFor="careerLife">Life Coaching</label>
          </div>
        </fieldset>

        {/* Dropdown for selecting session duration */}
        <div className='input-holder'>
          <label htmlFor="sessionDuration">Session Duration</label>
          <select name="sessionDuration" id="sessionDuration" required className='select'>
            <option value="30 minutes">30 Minutes</option>
            <option value="1 hour">1 Hour</option>
            <option value="1.5 hours">1.5 Hours</option>
          </select>
        </div>

        {/* Date picker for selecting appointment date */}
        <div className='input-holder'>
          <label htmlFor="date">Choose Appointment Date</label>
          <input 
            type="date" 
            name="date" 
            id="date"
            min={new Date(Date.now() + 7 * 86400000).toISOString().split("T")[0]}
            max={new Date(Date.now() + 28 * 86400000).toISOString().split("T")[0]}
            required 
            className='input' 
          />
        </div>

        {/* Dropdown for selecting time slot */}
        <div className='input-holder'>
          <label htmlFor="time">Select Time Slot</label>
          <select name="time" id="time" required className='select'>
            <option value="">--Select Time--</option>
            <option value="7.00 AM">Morning, 7.00 AM</option>
            <option value="12.00 PM">Afternoon, 12.00 PM</option>
            <option value="5.00 PM">Evening, 5.00 PM</option>
          </select>
        </div>

        {/* Input for preferred therapist (optional) */}
        <div className='input-holder'>
          <label htmlFor="preferredTherapist">Preferred Therapist (Optional)</label>
          <input type="text" name="preferredTherapist" id="preferredTherapist" placeholder="Dr. Joe Don" maxLength="50" className='input' />
        </div>

        {/* Textarea for the reason for therapy */}
        <div className='input-holder'>
          <label htmlFor="reason">Why do you need therapy?</label>
          <textarea name="reason" id="reason" placeholder="Briefly describe your reason..." maxLength="200" rows="4" className='textarea'></textarea>
        </div>

        {/* Submit button with loading state */}
        <button 
          className='button' 
          disabled={navigation.state === 'submitting' || navigation.state === 'loading'} 
          type="submit"
        >
          {navigation.state === 'submitting' || navigation.state === 'loading' ? 'Processing...' : 'Confirm Booking'}
        </button>
      </Form>
    </section>
  );
}

export default Booking;
