
const ACCESS_TOKEN_KEY = 'accessToken';
const REFRESH_TOKEN_KEY = 'refreshToken'
export const setAccessToken = (value: string) => localStorage.setItem(ACCESS_TOKEN_KEY, value);
export const setRefreshToken = (value: string) => localStorage.setItem(REFRESH_TOKEN_KEY, value)
export const getAccessToken = () => localStorage.getItem(ACCESS_TOKEN_KEY);
export const getRefreshToken = () => localStorage.getItem(REFRESH_TOKEN_KEY);
export const removeAccessToken = () => localStorage.removeItem(ACCESS_TOKEN_KEY);
export const removeRefreshToken = () => localStorage.removeItem(REFRESH_TOKEN_KEY);