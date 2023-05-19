import { Box, AppBar, Toolbar, IconButton, Typography, Button } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const getUser = localStorage.getItem('email');
  console.log(getUser === null, 'getuser');

  const [usersData, setUsersData] = useState();

  useEffect(() => {
    const fetchGetAllUsers = async () => {
      const res = await axios.get('http://localhost:5000/getSignup');
      setUsersData(res.data);
      console.log(res.data, 'usrGEtress');
    };
    fetchGetAllUsers();
  }, []);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position='static'
        sx={{ bgcolor: '#aaa', boxShadow: 'none', mb: '40px', width: '100vw' }}
      >
        <Toolbar>
          <IconButton
            size='large'
            edge='start'
            color='inherit'
            aria-label='menu'
            sx={{ mr: 2 }}
          ></IconButton>
          <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
            News
          </Typography>
          {getUser === null || undefined ? (
            <Link to='/login'>
              <Button>Login</Button>
            </Link>
          ) : (
            <Box>
              {usersData &&
                usersData.map(
                  data =>
                    data.email === getUser && (
                      <Link key={data.name} to={`/userInfo/` + data.email}>
                        <Button>회원정보수정</Button>
                      </Link>
                    )
                )}
              <Button>로그아웃</Button>
            </Box>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
