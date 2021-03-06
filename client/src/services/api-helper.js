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
////// UPDATE GIFT LIST ////
export const putGiftList = async (id, giftListData) => {
  const resp = await api.put(`/giftlists/${id}`, giftListData)
  return resp.data.giftlist
}
////// delete GIFT LIST ////
export const deleteGiftList = async (id) => {
  const resp = await api.delete(`/giftlists/${id}`);
  return resp.data;
}

////// CREATE GIFT ////
export const postGift = async (giftListId, giftData) => {
  const resp = await api.post(`/giftlists/${giftListId}/gifts`, giftData)
  return resp.data.gift
}
////// CREATE GIFT ////
export const putGift = async (giftId, giftData) => {
  const resp = await api.put(`/giftlists/anything/gifts/${giftId}`, giftData)
  return resp.data.gift
}
////// CREATE GIFT ////
export const deleteGift = async (giftId) => {
  const resp = await api.delete(`/giftlists/anything/gifts/${giftId}`)
  return "Deleted";
}