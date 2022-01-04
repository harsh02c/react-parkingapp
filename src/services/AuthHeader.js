export default function authHeader() {
    const user = JSON.parse(localStorage.getItem('userData')); 
    if (user && user.token) {
    //   return { Authorization: 'Bearer ' + user.accessToken };
      return { Authorization: user.token};
    } else {
      return {};
    }
}
