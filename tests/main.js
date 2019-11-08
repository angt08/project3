const axios = require('axios');
const api = axios.create({
  baseURL: 'http://localhost:3001'
})

///////////////////STARS/////////////////////////////
//Get All Stars

const registerUser = async (registerData) => {
  try {
    const resp = await api.post('/auth/register', registerData);
    return resp.data;
  }
  catch (err) {
    console.log(err);
    return { error: "Invalid credentials" }
  }
}
const loginUser = async (loginData) => {
  try {
    const resp = await api.post('/auth/login', loginData);
    return resp.data;
  }
  catch (err) {
    return { error: "Invalid credentials" }
  }
}
const verifyUser = async (authToken) => {
  api.defaults.headers.common.authorization = `Bearer ${authToken}`;
  const resp = await api.get('/auth/verify');
  return resp.data;
}
/////////////////////////////////////////////////////

const main = async () => {
  // Test APIs
  const registerData = {
    username: "ben14",
    password: "benny"
  }
  //const {user, token } = await registerUser(registerData);
  //const { user, token } = await loginUser(registerData);
  //console.log(`User: ${user.userName} registered.ID: ${user.id} Token: ${token}`);
  //console.log(await verifyUser('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImJlbjE0IiwiaWQiOjE3LCJpYXQiOjE1NzMwOTU5Mzd9.V4EGr9WtgP33gkes-jc6ysoGa3ls3jXL-2QKFho4p2U'));
};
main();