import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <Box>
      <Typography>home_page</Typography>
      <Box>
        <Link to='/signup'>
          <Button>Sign-up</Button>
        </Link>
        <Link to='/login'>
          <Button>Login</Button>
        </Link>
        <Link to='/cart'>
          <Button>Cart</Button>
        </Link>
      </Box>
    </Box>
  );
};

export default Home;
