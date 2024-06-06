const fetchAvatar = async (url, setImgAvatar) => {
  try {
    let newUrl = url;
    if (!url.includes('https')) {
      const pathAccess = url.split('/');
      let newPathFile = '';

      for (let i = 3; i < pathAccess.length; i++) {
        if (i == pathAccess.length - 1) {
          newPathFile += pathAccess[i];
        } else {
          newPathFile += pathAccess[i] + '/';
        }
      }
      newUrl = `http://localhost:5001/${newPathFile}`;
    }
    setImgAvatar(newUrl);
  } catch (e) {
    console.log(e.message);
  }
};

export default fetchAvatar;
