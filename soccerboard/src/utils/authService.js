import jwtDecode from 'jwt-decode';
import http from './httpService';

const apiEndpoint = "/auth";
const tokenKey = "token";

http.setJwt(getJwt());

export function getJwt(){
    return localStorage.getItem(tokenKey);
}

export async function login(email, password){
    const { data: jwt } = await http.post(apiEndpoint, { email, password });
    localStorage.setItem(tokenKey, jwt);
}

export async function loginWithJwt(jwt){
    localStorage.setItem(tokenKey, jwt);
}

export function logout(){
    localStorage.removeItem(tokenKey);
}

export function getCurrentUser(){
    try {  
        const jwt = localStorage.getItem(tokenKey);
        return jwtDecode(jwt);
    }catch (ex) {
        return null;
    }
}

export default {
    getJwt,
    login,
    loginWithJwt,
    logout,
    getCurrentUser
}