import axios from 'axios';
const api = axios.create({
  baseURL: "http://localhost:3001"
})

// ============== Auth ================
export const registerUser = async (registerData) => {
  try {
    const resp = await api.post('/auth/register', registerData);
    api.defaults.headers.common.authorization = `Bearer ${resp.data.token}`;
    localStorage.authToken = resp.data.token;
    return resp.data.user;
  }
  catch (err) {
    return { error: "Invalid credentials" }
  }
}
export const loginUser = async (loginData) => {
  try {
    const resp = await api.post('/auth/login', loginData);
    api.defaults.headers.common.authorization = `Bearer ${resp.data.token}`;
    localStorage.authToken = resp.data.token;
    return resp.data.user;
  }
  catch (err) {
    return { error: "Invalid credentials" }
  }
}
export const verifyUser = async () => {
  const token = localStorage.authToken;
  if (token) {
    api.defaults.headers.common.authorization = `Bearer ${token}`;
    const resp = await api.get('/auth/verify');
    return resp.data;
  }
  return false;
}
/////////GiftList//////////////
// Get All Gift Lists for a logged in user
export const getGiftListsByUser = async (userId) => {
  try {
    const resp = await api.get(`/giftlists/${userId}/`);
    return resp.data.giftlists;
  }
  catch (err) {
    return { error: "Unable to retrieve gift lists" }
  }
}

////// CREATE GIFT LIST ////
export const postGiftList = async (userId, giftListData) => {
  const resp = await api.post(`/users/${userId}/giftlists`, giftListData)
  return resp.data.giftlist
}

export const getGiftsByGiftList = async (id) => {
  try {
    const resp = await api.get(`giftlists/${id}/gifts/`);
    return resp.data.gifts;
  }
  catch (err) {
    return { error: "Unable to retrieve gifts" }
  }
}
