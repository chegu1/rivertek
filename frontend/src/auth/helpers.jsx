import cookie from "js-cookie";

//set in cookie

export const setCookie = (key, value) => {
  if (window !== "undefined") {
    cookie.set(key, value, {
      expires: 1,
    });
  }
};

//remove from cookie
export const removeCookie = (key) => {
  if (window !== "undefined") {
    cookie.remove(key, {
      expires: 1,
    });
  }
};

//get from cookie such as stored token
// will be usueful to make request to server
export const getCookie = (key) => {
  if (window !== "undefined") {
    return cookie.get(key);
  }
};

// set in local storage
export const setLocalStorage = (key, value) => {
  if (window !== "undefined") {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

//remove local storage
export const removeLocalStorage = (key) => {
  if (window !== "undefined") {
    localStorage.removeItem(key);
  }
};

//authenticate user by passing data to cookie and local storage during signin
export const authenticate = (res, next) => {
  console.log("auth helper sign in response", res);
  setCookie("token", res.token);
  setLocalStorage("user", res);
  next();
};

//access user information from localstoarage
export const isAuth = () => {
  if (window !== "undefined") {
    const cookieChecked = getCookie("token");
    if (cookieChecked) {
      if (localStorage.getItem("user")) {
        return JSON.parse(localStorage.getItem("user"));
      } else {
        return false;
      }
    }
  }
};

export const signout = (next) => {
  removeCookie("token");
  removeLocalStorage("user");
  next();
};
