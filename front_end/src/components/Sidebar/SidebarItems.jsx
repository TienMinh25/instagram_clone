import { useState } from 'react';
import CreatePost from './CreatePost';
import Home from './Home';
import Messages from './Message';
import Notifications from './Notifications';
import ProfileLink from './ProfileLink';
import Search from './Search';

const SidebarItems = ({
  searchQuery,
  setSearchQuery,
  isCollapsed,
  setSelectedItem,
  selectedItem,
  setIsSidebarCollapsed,
  showSidebarContent,
  setShowSidebarContent,
  isClicked,
  setIsClicked
}) => {
  const handleClick = (item) => {
    setSelectedItem(item);
  };
  return (
    <>
      <Home
        setIsSidebarCollapsed={setIsSidebarCollapsed}
        setShowSidebarContent={setShowSidebarContent}
        isCollapsed={isCollapsed}
        isSelected={selectedItem === 'home'}
        onClick={() => {
          handleClick('home');
          setIsClicked(false);
          setSearchQuery('');
        }}
      />
      <Search
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        isCollapsed={isCollapsed}
        isSelected={selectedItem === 'search'}
        selectedItem={selectedItem}
        setIsSidebarCollapsed={setIsSidebarCollapsed}
        showSidebarContent={showSidebarContent}
        setShowSidebarContent={setShowSidebarContent}
        onClick={() => handleClick('search')}
        isClicked={isClicked}
        setIsClicked={setIsClicked}
      />
      <Notifications
        setIsSidebarCollapsed={setIsSidebarCollapsed}
        setShowSidebarContent={setShowSidebarContent}
        isCollapsed={isCollapsed}
        isSelected={selectedItem === 'notifications'}
        onClick={() => {
          handleClick('notifications');
          setIsClicked(false);
          setSearchQuery('');
        }}
      />
      <Messages
        isCollapsed={isCollapsed}
        isSelected={selectedItem === 'messages'}
        onClick={() => {
          handleClick('messages');
          setSearchQuery('');
        }}
      />
      <CreatePost isCollapsed={isCollapsed} />
      <ProfileLink
        setIsSidebarCollapsed={setIsSidebarCollapsed}
        setShowSidebarContent={setShowSidebarContent}
        isCollapsed={isCollapsed}
        isSelected={selectedItem === 'profileLink'}
        onClick={() => {
          handleClick('profileLink');
          setIsClicked(false);
          setSearchQuery('');
        }}
      />
    </>
  );
};

export default SidebarItems;
