import axios from 'axios';
import authHeader from "./AuthHeader";
import AuthService from './AuthService';
const AUTH_API_BASE_URL = "http://localhost:8080/parking";

class ParkingService{
    
    getParkingListing(parking){
        return axios.post(AUTH_API_BASE_URL+'/getAllParking',parking, { headers: authHeader()  });
    }

    getUserParkingListing(parking){
        const userId = AuthService.getCurrentUser()._id;
        return axios.post(AUTH_API_BASE_URL+'/getUserParking/'+userId,parking, { headers: authHeader()  });
    }

    getParkingDetails(parking){
        return axios.get(AUTH_API_BASE_URL+'/getParkingById/'+parking, { headers: authHeader() });
    }

    addParking(parking){
        // return axios.post(AUTH_API_BASE_URL+'/addParking',parking, { headers: authHeader() });
        return axios.post(AUTH_API_BASE_URL+'/addParking',parking, { headers: authHeader()  } );
    }
    
    editParking(parking){
        return axios.put(AUTH_API_BASE_URL+'/updateParkingById/'+parking._id,parking, { headers: authHeader() });
    }

    deleteParking(parking){ 
        return axios.delete(AUTH_API_BASE_URL+'/deleteById/'+parking, { headers: authHeader() });
    }
}

export default new ParkingService();