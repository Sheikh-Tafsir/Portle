import { jwtDecode } from "jwt-decode";
export const checkLogin = () => {
    const token = localStorage.getItem('portleAccessToken');
    if(token == null || token == undefined || token == ""){
        return null;
    }
    else{
        const user = jwtDecode(token);
        // console.log(user);
        return user;
    }
};