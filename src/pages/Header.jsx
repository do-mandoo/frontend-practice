import { Box, AppBar, Toolbar, Typography, Button } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Header = () => {
  const location = useLocation();
  console.log(location.pathname, '오우 로케이션');

  // localStorage에 저장한 email을 가져온다
  const getUser = localStorage.getItem('email');
  console.log(getUser === null, 'getuser');

  const navigate = useNavigate();

  const [usersData, setUsersData] = useState();

  // 랜더링 될 때, 모든 사용자 계정을 가져온다.
  useEffect(() => {
    const fetchGetAllUsers = async () => {
      const res = await axios.get('http://localhost:5000/getSignup');
      setUsersData(res.data);
      console.log(res.data, 'usrGEtress');
    };
    fetchGetAllUsers();
  }, []);

  // 로그아웃
  const handleLogout = async () => {
    const res = await axios.post('http://localhost:5000/logout');
    if (res.status === 200) {
      localStorage.removeItem('email');
      localStorage.removeItem('password');
    }
    navigate('/cart');
    console.log(res, 'res 로그아웃');
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position='static'
        sx={{
          bgcolor: 'rgb(178, 79, 126)',
          boxShadow: 'none',
          mb: '80px',
          width: '100vw',
        }}
      >
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Link to='/'>
            <Typography
              variant='h6'
              component='div'
              sx={{ color: '#fff', flexGrow: 1, fontSize: '48px', fontWeight: 700 }}
            >
              Your Preference
            </Typography>
          </Link>

          {location.pathname === '/' ? (
            <Box></Box>
          ) : getUser !== null || undefined ? (
            <Box>
              {/* 모든 사용자 정보 중 localStorage에 저장한 email정보가 일치하면 param에 추가하여 날린다. */}
              {usersData &&
                usersData.map(
                  data =>
                    data.email === getUser && (
                      <Link key={data.name} to={`/userInfo/` + data.email}>
                        <Button sx={{ color: '#000' }}>회원정보수정</Button>
                      </Link>
                    )
                )}
              <Button sx={{ color: '#000' }} onClick={handleLogout}>
                Log-out
              </Button>
            </Box>
          ) : (
            <Link to='/login'>
              <Button sx={{ color: '#000' }}>Log-in</Button>
            </Link>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
