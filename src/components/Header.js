import React,{useState,useEffect} from "react";
import {  Link, useNavigate } from "react-router-dom";
import AuthService from "../services/AuthService";
const Header=()=>{
    const [currentUser, setCurrentUser] = useState(undefined);
    useEffect(() => {
        const user = AuthService.getCurrentUser();
         
        if (user) {
            setCurrentUser(user); 
        }
    }, []);

    function Logout(){
        localStorage.clear();
        Header.render()
    }

    return ( 
            <nav className="navbar navbar-expand-lg navbar-light fixed-top" id="header">
                <div className="container">
                <Link className="navbar-brand" to={"/"}><span>ParkingApp</span></Link>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                        <ul className="navbar-nav ml-auto">

                        {  currentUser ? (
                            
                            <div className="navbar-nav">
                                <li className="nav-item">
                                    <Link className="nav-link" to={"/user-parkings"} ><span>My Parkings</span></Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to={"/user-bookings"} ><span>My Bookings</span></Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to={"/sign-in"} onClick={Logout}><span>Logout</span></Link>
                                    {/* <a className="nav-link" onClick={Logout}><span>Logout</span></a> */}
                                </li>
                              
                            </div>
                            ) : (
                            <div className="navbar-nav">
                                <li className="nav-item">
                                    <Link className="nav-link" to={"/sign-in"}><span>Sign in</span></Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to={"/register"}><span>Register</span></Link>
                                </li>
                            </div>
                            )}
                        </ul>
                    </div>
                </div>
            </nav> 
    );
}
export default Header;