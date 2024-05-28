import CreatePost from './CreatePost';
import Home from './Home';
import Notifications from './Notifications';
import ProfileLink from './ProfileLink';
import Search from './Search';
import { useState } from 'react';

const SidebarItems = () => {
  const [selectedItem, setSelectedItem] = useState('');

  const handleClick = (item) => {
    setSelectedItem(item);
  };
  return (
    <>
      <Home isSelected={selectedItem === 'home'} onClick={() => handleClick('home')} />
      <Search isSelected={selectedItem === 'search'} onClick={() => handleClick('search')} />
      <Notifications
        isSelected={selectedItem === 'notifications'}
        onClick={() => handleClick('notifications')}
      />
      <CreatePost />
      <ProfileLink
        isSelected={selectedItem === 'profileLink'}
        onClick={() => handleClick('profileLink')}
      />
    </>
  );
};

export default SidebarItems;
