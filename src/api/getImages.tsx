import axios, { AxiosError } from "axios";

/**
 * Send request to NASA api
 * @returns Images array with 'liked' status
 */
export const getImages = async (): Promise<ImageProps[]> => {
  try {
    const { data } = await axios.get<ImageProps[]>(
      "https://api.nasa.gov/planetary/apod?api_key=aZs7Z89YLKa1NydBXLjI9DmfbMRwtCLaGTUuDO9O&count=30&thumbs=true"
    );
    const dataWithLiked = data.map((item) => ({ ...item, liked: false }));
    return dataWithLiked;
  } catch (error) {
    const err = error as AxiosError;
    if (err.response) {
      console.log(err.response.status);
      console.log(err.response.data);
    }
    throw err;
  }
};
