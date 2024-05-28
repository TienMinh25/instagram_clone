export default function handlePathFile(mediaFile, setImgMediaList) {
  mediaFile.split('$||$').forEach((mediaPath) => {
    const pathAccess = mediaPath.split('/');
    let newPathFile = '';

    for (let i = 3; i < pathAccess.length; i++) {
      if (i == pathAccess.length - 1) {
        newPathFile += pathAccess[i];
      } else {
        newPathFile += pathAccess[i] + '/';
      }
    }

    setImgMediaList((prevImgMediaList) => [...prevImgMediaList, newPathFile]);
  });
}
