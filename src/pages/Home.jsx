import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import Header from './Header';

const Home = () => {
  // localStorage에 저장한 email을 가져온다
  const getUser = localStorage.getItem('email');
  return (
    <Box sx={{ width: '100vw', height: '100vh', margin: '0 auto' }}>
      <Header />
      <Box sx={{ width: '100vw' }}>
        <Typography>home_page</Typography>
        {getUser === null || undefined ? (
          <Box>
            <Link to='/signup'>
              <Button>Sign-up</Button>
            </Link>
            <Link to='/signupAdmin'>
              <Button>Sign-up-Admin</Button>
            </Link>
            <Link to='/login'>
              <Button>Login</Button>
            </Link>
          </Box>
        ) : (
          <Link to='/cart'>
            <Button>Cart</Button>
          </Link>
        )}
      </Box>
    </Box>
  );
};

export default Home;
