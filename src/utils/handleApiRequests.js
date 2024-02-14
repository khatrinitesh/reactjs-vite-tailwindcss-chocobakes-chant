import axios from "axios";

// API KEY
const apikey = import.meta.env.VITE_API_KEY;
const serverUrl = import.meta.env.VITE_SERVER_URL;

export const handleApiRequests = async (body, endpoint) => {
  try {
    const response = await axios.post(`${serverUrl}/${endpoint}`, {
      apikey,
      ...body,
    });
    return response.data;
  } catch (err) {
    return err;
  }
};
