import axios from 'axios';
import authHeader from "./AuthHeader";
import AuthService from './AuthService';
// const AUTH_API_BASE_URL = "http://localhost:8080/parking";
const AUTH_API_BASE_URL = "http://parkingappcloudgateway-env.eba-eqk6fgj3.us-east-1.elasticbeanstalk.com/parking";

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
        // const formData = new FormData();
        // formData.append('name',parking.name)
        // formData.append('country',parking.country)
        // formData.append('state',parking.state)
        // formData.append('city',parking.city)
        // formData.append('address',parking.address)
        // formData.append('price',parking.price)
        // formData.append('totalslots',parking.totalslots)
        // formData.append('availableslots',parking.availableslots)
        // const blob = new Blob([parking.images], {type: parking.images.type});

        // formData.append('images',blob)
        // formData.append('user', JSON.stringify(parking.user))
        // return axios.post(AUTH_API_BASE_URL+'/addParking',parking, { headers: authHeader() });
        return axios.post(AUTH_API_BASE_URL+'/addParking',parking, { headers: authHeader()  } );
    }
    
    editParking(parking){
        return axios.put(AUTH_API_BASE_URL+'/updateParkingById/'+parking._id,parking, { headers: authHeader() });
    }

    uploadImages(parking,id){
        return axios.post(AUTH_API_BASE_URL+'/addImages/'+id,parking, { headers: authHeader() });
    }

    deleteParking(parking){ 
        return axios.delete(AUTH_API_BASE_URL+'/deleteById/'+parking, { headers: authHeader() });
    }
}

export default new ParkingService();