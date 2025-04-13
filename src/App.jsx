// Importing layout and pages
import AppLayout from "./layouts/appLayout"
import Homepage from "./pages/home"
import Login  from "./pages/logIn"
import SignUp  from "./pages/signUp"
import Profile from "./pages/profile"

// Importing components
import Private from "./components/private/private"
import Billing from "./components/billing"
import Messages from "./components/messages"
import Resources from "./components/dashboard/resources"
import Settings from "./components/settings"

// Importing booking-related components
import Booking ,{ action as bookingAction } from "./pages/booking"
import BookingTicket, { loader as bookingTicketLoader } from "./components/bookingTicket"

// Importing necessary React Router DOM functions
import { RouterProvider, 
        createBrowserRouter, 
        createRoutesFromElements, 
        Route } from "react-router-dom"

// Importing global styles
import "./assets/styles/app.css"

// Importing context for global state management
import { useApp } from "./context/appContext"

// Importing error handling component
import RouteError from "./components/error-components/Error"

// Importing additional pages
import About from "./pages/about"
import Policy from "./pages/policy"

// Importing dashboard components
import Appointments, { loader as appointmentLoader } from "./components/dashboard/appointments"

// Importing utility and chatbot components
import ComingSoon from "./components/utilities/comingSoon"
import CareerCoachBot from "./components/chatbots/careerCoachBot"
import CognitiveBTBot from "./components/chatbots/cognitiveBTbot"
import MindfulnessBTBot from "./components/chatbots/mindfulnessBTbot"

function App() {

  // Accessing global user context
  const userContext = useApp()

  // Creating router configuration
  const router = createBrowserRouter(
    createRoutesFromElements(
          <Route path="/" element={<AppLayout />} errorElement={<RouteError />}>
            <Route index element={<Homepage/>}></Route>
            <Route path="about" element={<About/>} />
            <Route path="login" element={<Login/>} />
            <Route path="signup" element={<SignUp/>} />
            <Route path="privacypolicy" element={<Policy/>} />
            
            {/* Private Routes: Require authentication */}
            <Route element={<Private />}>
              <Route path="profile" element={<Profile/>}>
                <Route index element={<Appointments />} loader={appointmentLoader(userContext)} />
                <Route path="messages" element={<Messages />} />
                <Route path="billing" element={<Billing />} />
                <Route path="resources" element={<Resources />} />
                <Route path="settings" element={<Settings />} />
              </Route>

              {/* Additional pages and chatbot routes */}
              <Route path="comingsoon" element={<ComingSoon />} />
              <Route path="cbtchat" element={<CognitiveBTBot />} />
              <Route path="mindchat" element={<MindfulnessBTBot />} />
              <Route path="careerchat" element={<CareerCoachBot />} />

              {/* Booking routes */}
              <Route  path="booking" 
                      element={<Booking/>} 
                      action={bookingAction(userContext)}
                      errorElement={<RouteError />}/>

              <Route  path="booking/:uid/:id" 
                      element={<BookingTicket />}
                      loader={bookingTicketLoader(userContext)} 
                      errorElement={<RouteError />}/>
            </Route>
          </Route>
    )
  )

  return(
      // Providing router to the application
      <RouterProvider router={router}/>
  )
}

export default App
