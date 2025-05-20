import axios from "axios";

const API_URL = "http://localhost:5000/api/contact";

export const submitContactForm = async (data) => {
  try {
    const response = await axios.post(API_URL, data);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: "Something went wrong" };
  }
};

