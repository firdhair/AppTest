import axios from 'axios';

const API_KEY = 'YOUR_PIXABAY_API_KEY';
const BASE_URL = 'https://pixabay.com/api/';

export const fetchImages = async (query: string, page: number) => {
  const response = await axios.get(`${BASE_URL}?key=${API_KEY}&q=${query}&image_type=photo&page=${page}`);
  return response.data;
};
