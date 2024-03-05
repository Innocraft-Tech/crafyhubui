const { default: axios } = require('axios');

export const getClient = async (id) => {
  const client = await axios
    .get(`https://crafy-server.onrender.com/client/${id}`)
    .catch((err) => console.log(err));
  const responseData = await client.data.client;
  return responseData;
};
