import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import Login from "./components/Login";
import Register from "./components/Register";
import Header from './components/Header'; 
// import Footer from './components/Footer';
import ParkingListing from './components/ParkingListing';
import AddParking from './components/AddParking';
import EditParking from './components/EditParking';
import ParkingDetails from './components/ParkingDetails';
import UserParkingListing from './components/UserParkingListing';
import UserBookingListing from './components/UserBookingListing';
import ReactDOM from 'react-dom'; 
import {Helmet} from "react-helmet";   //used to add meta tag in react https://github.com/nfl/react-helmet

function App() {
   
  return( 

      <div className="App">
          <Helmet>
              <meta name="viewport" content="width=device-width, initial-scale=1.0"/>

            </Helmet>
        <Header/> 
        <div className="outer">
          <Routes> 
            <Route exact path='/' element={<ParkingListing/>}  />
            <Route exact path='/user-parkings' element={<UserParkingListing/>}  />
            <Route exact path='/user-bookings' element={<UserBookingListing/>}  />
            <Route path="/sign-in" element={<Login/>} />
            <Route path="/register" element={<Register/>} />
            <Route path="/add-parking" element={<AddParking/>} />
            <Route path="/edit-parking/:id" element={<EditParking/>} />
            <Route path="/parking-details/:id" element={<ParkingDetails/>} />
              {/* <Route path="/logout" element={<Logout/>} /> */}
          </Routes>
          
        </div> 
      </div> 
   
  );
}


export default App;
