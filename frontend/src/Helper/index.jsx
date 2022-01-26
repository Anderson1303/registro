export const TOKEN_KEY = "@unimedchapeco1303-Token";

export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;

export const getToken = () => localStorage.getItem(TOKEN_KEY);

const login = token => {
  localStorage.setItem(TOKEN_KEY, token);
};

const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
  return true;
};

const check = () => {
    return localStorage.getItem(TOKEN_KEY);
}

export {login,logout,check}