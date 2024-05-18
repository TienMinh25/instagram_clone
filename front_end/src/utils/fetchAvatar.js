import { makeRequest } from '../axios';

const fetchAvatar = async (url, setImgAvatar) => {
  try {
    if (url.slice(0, 5) === 'https') {
      setImgAvatar(url);
    } else {
      const res = await makeRequest.get(`/users/avatar?filename=${url}`, {
        headers: {
          Accept: 'image/*'
        },
        responseType: 'blob',
      });
      
      const imageObjectUrl = URL.createObjectURL(res.data);
      setImgAvatar(imageObjectUrl);
    }
  } catch (e) {
    console.log(e.message);
  }
};

export default fetchAvatar;
