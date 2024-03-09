import axios from 'axios';

export const userSignupRequest = async (data) => {
  const user = await axios
    .post('https://crafy-server.onrender.com/auth', data)
    .catch((err) => console.log(err));
  console.log(user);
  return user   ;
};

export const loginRequest = async (data) => {
  const response = await axios
    .post('https://crafy-server.onrender.com/auth/login', data)
    .catch((err) => console.log(err));
  console.log(user);
  const responseData = response.data;
  return responseData;
};

export const uploadCoverPhoto = async (data) => {
  const coverPhoto = await axios
    .post('https://crafy-server.onrender.com/upload/coverphoto', data)
    .catch((err) => console.log(err));
  console.log(coverPhoto);
  return coverPhoto;
};

export const updateUserProfile = async (data) => {
  const id =
    typeof window !== 'undefined'
      ? JSON.parse(localStorage.getItem('userId') || '{}')
      : null;
  const user = await axios
    .post(`https://crafy-server.onrender.com/profile/update/:${id}`, data)
    .catch((err) => console.log(err));
  console.log(user);
  return user;
};

export const deleteUserAccoount = async (data) => {
  const response = await axios
    .delete(`https://crafy-server.onrender.com/user/${id}`, data)
    .catch((err) => console.log(err));
  return response.data;
};

// export const getUser = async(id)=>{
//     const isClient =
//     typeof window !== "undefined"
//       ? JSON.parse(localStorage.getItem("isClient") || "{}")
//       : null;
//       console.log(isClient);
//       let response;
//       if(isClient){
//         response = await axios.get(`http://localhost:8080/client/${id}`)
//       }else{
//           response = await axios.get(`http://localhost:8080/user/${id}`)
//       }
//     console.log("response"+response);
//     const responseData = await response.data;
//     return responseData;
// }

export const getUser = async (id) => {
  let response, responseData;
  try {
    response = await axios.get(`http://localhost:8080/user/${id}`);
    responseData = await response.data.user;
    return responseData;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
};

export const getAllUsers = async () => {
  const users = await axios
    .get('https://crafy-server.onrender.com/allusers')
    .catch((err) => console.log(err));
    console.log(users)
  const responseData = await users.data.users;
  return responseData;
};

export const getAllJobs = async (data) => {
  const jobs = await axios
    .post('https://crafy-server.onrender.com/job/alljobs', data)
    .catch((err) => console.log(err));
  const responseData = jobs.data;
  return responseData;
};

const resendEmailVerification = async (email) => {
  const response = await axios.post('http:localhost:8080/client/verification');
  if (response.data.status === 'success') {
    return true;
  }
};
