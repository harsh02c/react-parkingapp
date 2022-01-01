import axios from 'axios';
const AUTH_API_BASE_URL = "http://localhost:8080/parking-auth";

class AuthService{
    registerUser(user){
        return axios.post(AUTH_API_BASE_URL+'/signup',user);
    }

    loginUser(user){
        return axios.post(AUTH_API_BASE_URL+'/login',user);
    }

    logout() { 
        localStorage.removeItem('userData');
        localStorage.removeItem('userToken');
        localStorage.removeItem('userId');
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('userData'));
    }
}

export default new AuthService();