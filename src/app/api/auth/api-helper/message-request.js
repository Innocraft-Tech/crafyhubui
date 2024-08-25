import axios from 'axios';

export const addMessage = async (data) => {
  const message = await axios
    .post('https://crafy-server.onrender.com/message/add', data)
    .catch((err) => console.error(err));
  const responseData = await message.data.message;
  return responseData;
};

export const getMessages = async (id) => {
  const messages = await axios
    .get(`https://crafy-server.onrender.com/message/${id}`)
    .catch((err) => console.error(err));
  const responseData = await messages.data.messages;
  return responseData;
};
