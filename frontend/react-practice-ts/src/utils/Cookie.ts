import { Cookies } from "react-cookie";

const cookies = new Cookies();

export const setCookie = (name : string, value: string) => {
    return cookies.set(name, value, {maxAge: 60 * 30 * 1, path : '/'});
}

export const getCookie = (name:string) => {
    return cookies.get(name);
}

export const removeCookie = (name:string) => {
    return cookies.set(name, "" ,{maxAge:0 , path:'/'});
}

export const setIdCookie = (name:string, value:string, days:number) => {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    
    document.cookie = `${name}=${encodeURIComponent(value)}; ${expires}; path=/;`;
  }