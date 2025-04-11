import axios from "axios";
const API_KEY = "ZKzf5vrZVcX157smAUkAOGKvUL0mmTRERRev3xX3s6nY4ipd26pGTmFw"; // for Pexels/Unsplash
export const fetchImages = async (query) => {
  const response = await axios.get(
    `https://api.pexels.com/v1/search?query=${query}`,
    {
      headers: { Authorization: API_KEY },
    }
  );
  return response.data.photos;
};
