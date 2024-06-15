import CreatePost from './CreatePost';
import Home from './Home';
import Messages from './Message';
import Notifications from './Notifications';
import ProfileLink from './ProfileLink';
import Search from './Search';

const SidebarItems = ({ isCollapsed, setSelectedItem, selectedItem }) => {
  const handleClick = (item) => {
    setSelectedItem(item);
  };
  return (
    <>
      <Home
        isCollapsed={isCollapsed}
        isSelected={selectedItem === 'home'}
        onClick={() => handleClick('home')}
      />
      <Search
        isCollapsed={isCollapsed}
        isSelected={selectedItem === 'search'}
        onClick={() => handleClick('search')}
      />
      <Notifications
        isCollapsed={isCollapsed}
        isSelected={selectedItem === 'notifications'}
        onClick={() => handleClick('notifications')}
      />
      <Messages
        isCollapsed={isCollapsed}
        isSelected={selectedItem === 'messages'}
        onClick={() => handleClick('messages')}
      />
      <CreatePost isCollapsed={isCollapsed} />
      <ProfileLink
        isCollapsed={isCollapsed}
        isSelected={selectedItem === 'profileLink'}
        onClick={() => handleClick('profileLink')}
      />
    </>
  );
};

export default SidebarItems;
