import React from 'react';
import { useLoaderData } from 'react-router-dom';
import { PDFDownloadLink } from '@react-pdf/renderer';
import TicketLayout from './utilities/ticketLayout';
import styles from '../assets/styles/bookingTicket.module.css'



export const loader = (userContext) => async ({ params }) => {
  const { getNewBooking } = userContext;
  const ticket = await getNewBooking(params.uid, params.id);
  return ticket.data();
};



function BookingTicket() {

  const data = useLoaderData();

  return (
    <section className={`sections ${styles.ticketSection}`}>
      <h3 className="sections-header succeed-msg">Therapist Appointment Details</h3>

      <div className={styles.ticketWrapper}>
        <div className={styles.ticketDetails}>
          <h3>
            Client Name: <span className={styles.specialText}>{data.name}</span>
          </h3>
          <h3>
            Appointment Date: <span className={styles.specialText}>{data.appointmentDate}</span>
          </h3>
          <h3>
            Appointment Time: <span className={styles.specialText}>{data.time}</span>
          </h3>
          <h3>
            Session Link: <span className={styles.specialText}><a className={styles.specialText} href={data.sessionLink} target="_blank" rel="noopener noreferrer">{data.sessionLink}</a></span>
          </h3>
          <h3>
            Google Meet ID: <span className={styles.specialText}>{data.sessionId}</span>
          </h3>
          <h3>
            Contact Number: <span className={styles.specialText}>0743432054</span>
          </h3>
        </div>

        <div className={styles.printTicket}>
          <PDFDownloadLink
            document={<TicketLayout data={data} />}
            fileName="appointment.pdf"
            className={styles.printTicket}
          >
            {({ loading }) => (loading ? 'Generating PDF...' : 'Download Ticket')}
          </PDFDownloadLink>
        </div>
      </div>



      <div className={styles.contactSection}>
      <p className={styles.ticketParagraph}>
        Your appointment is virtual. The ticket includes the meeting link and ID. For cancellations or rescheduling, please notify us at least 24 hours ahead.
      </p>
      <p className={styles.ticketParagraph}>
        Feel free to reach out with any questions. We look forward to your session.
      </p>
      <p className={styles.ticketParagraph}> Regards, <br />
      <strong>The OnlineMedic Team</strong>
  </p>
</div>

    </section>
  );
}

export default BookingTicket;
