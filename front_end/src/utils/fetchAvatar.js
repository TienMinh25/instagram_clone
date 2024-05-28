const fetchAvatar = async (url, setImgAvatar) => {
  try {
    setImgAvatar(url);
  } catch (e) {
    console.log(e.message);
  }
};

export default fetchAvatar;
