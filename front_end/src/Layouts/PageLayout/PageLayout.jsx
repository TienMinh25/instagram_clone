import { Flex, Box } from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';
import Sidebar from '../../components/Sidebar/Sidebar';
import { useContext } from 'react';
import Wait from '../../components/Wait/Wait';
import { UserContext } from '../../context/userContext';

function PageLayout({ isCollapsed, children, setIsSidebarCollapsed }) {
  const { pathname } = useLocation();
  const { loading } = useContext(UserContext);

  return loading ? (
    <Wait />
  ) : (
    <Flex>
      {pathname !== '/auth' && (
        <Box w={isCollapsed ? '70px' : { base: '70px', md: '240px' }}>
          <Sidebar isCollapsed={isCollapsed} setIsSidebarCollapsed={setIsSidebarCollapsed}/>
        </Box>
      )}
      <Box
        flex={1}
        w={
          isCollapsed
            ? { base: 'calc(100% - 70px)', md: 'calc(100% - 240px)' }
            : 'calc(100% - 240px)'
        }>
        {children}
      </Box>
    </Flex>
  );
}

export default PageLayout;
