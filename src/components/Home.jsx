import { Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import Header from './Header';

const Home = () => {
  // localStorage에 저장한 email을 가져온다
  const getUser = localStorage.getItem('email');
  return (
    <Box sx={{ width: '100vw', height: '100vh', margin: '0 auto' }}>
      <Header />
      <Box sx={{ width: '100vw', mt: '25%' }}>
        {/* <Typography component='h1' variant='h2' sx={{ mb: '10px' }}>
          home_page
        </Typography> */}
        {getUser === null || undefined ? (
          <Box>
            <Link to='/signup'>
              <Button
                sx={{
                  border: '1px solid #000',
                  bgcolor: '#fff',
                  padding: '20px 30px',
                  fontSize: '16px',
                  mr: '15px',
                  '&:hover': {
                    bgcolor: '#cdcaca',
                    color: '#000',
                  },
                }}
              >
                Sign-up
              </Button>
            </Link>
            {/* <Link to='/signupAdmin'>
              <Button>Sign-up-Admin</Button>
            </Link> */}
            <Link to='/login'>
              <Button
                sx={{
                  border: '1px solid #000',
                  bgcolor: '#fff',
                  padding: '20px 40px',
                  fontSize: '16px',
                  mr: '15px',
                  '&:hover': {
                    bgcolor: '#cdcaca',
                    color: '#000',
                  },
                }}
              >
                Login
              </Button>
            </Link>
          </Box>
        ) : (
          <Link to='/main'>
            <Button>Main</Button>
          </Link>
        )}
      </Box>
    </Box>
  );
};

export default Home;
