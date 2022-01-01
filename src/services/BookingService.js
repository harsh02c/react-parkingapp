import axios from 'axios';
import authHeader from "./AuthHeader";
import AuthService from './AuthService';

const AUTH_API_BASE_URL = "http://localhost:8080/booking";

class BookingService{
 
    payBooking(booking){
        return axios.post(AUTH_API_BASE_URL+'/payBooking',booking, { headers: authHeader() });
    }
    
    verifySignature(booking){
        return axios.post(AUTH_API_BASE_URL+'/verifySignature',booking, { headers: authHeader() });
    }

    addBooking(booking){
        return axios.post(AUTH_API_BASE_URL+'/addBooking',booking, { headers: authHeader() });
    }

    
    userBooking(){
        const userId = AuthService.getCurrentUser()._id;
        return axios.get(AUTH_API_BASE_URL+'/getAllUserBooking/'+userId, { headers: authHeader() });
    }
    
}

export default new BookingService();