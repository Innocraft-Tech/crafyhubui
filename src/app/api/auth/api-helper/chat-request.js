import axios from 'axios';

// export const createChat = (data) => API.post('/chat/', data);
export const userChats = async (id) => {
  const chats = await axios
    .get(`http://localhost:8080/chat/${id}`)
    .catch((err) => console.log(err));
  const finalChats = await chats?.data;
  return finalChats;
};
