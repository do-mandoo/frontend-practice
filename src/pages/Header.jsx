import { Box, Toolbar, Typography, Button, IconButton, Drawer } from '@mui/material';
import MuiAppBar from '@mui/material/AppBar';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import CartSide from './CartSide';
import { styled, useTheme } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const drawerWidth = 440;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: prop => prop !== 'open',
})(({ theme, open }) => ({
  // transition: theme.transitions.create(['margin', 'width'], {
  //   easing: theme.transitions.easing.sharp,
  //   duration: theme.transitions.duration.leavingScreen,
  // }),
  transition: 'unset',
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    // transition: theme.transitions.create(['margin', 'width'], {
    //   easing: theme.transitions.easing.easeOut,
    //   duration: theme.transitions.duration.enteringScreen,
    // }),
    transition: 'unset',
    marginRight: drawerWidth,
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-start',
}));

const Header = ({ open, setOpen }) => {
  // // 슬라이드 카트 바 열고/닫기
  // const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const theme = useTheme();

  // url위치 확인
  const location = useLocation();
  console.log(location.pathname, '오우 로케이션');

  // localStorage에 저장한 email을 가져온다
  const getUser = localStorage.getItem('email');
  console.log(getUser === null, 'getuser');

  const navigate = useNavigate();

  // 모든 사용자 계정
  const [usersData, setUsersData] = useState();
  // 로그인한 계정
  const [loginUserData, setLoginUserData] = useState();

  // 랜더링 될 때, 모든 사용자 계정을 가져온다.
  useEffect(() => {
    const fetchGetAllUsers = async () => {
      const res = await axios.get('http://localhost:5000/getSignup');
      // 모든 계정을 userData에 저장.
      setUsersData(res.data);
      console.log(res.data, 'usrGEtress');
      // 로그인한 계정의 데이터를 loginUserData에 저장.
      const mapfilter = res.data.filter(data => data.email === getUser);
      setLoginUserData(mapfilter);
      console.log(loginUserData, '확인isAdmin???');
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
    <Box>
      <AppBar
        position='static'
        sx={{
          bgcolor: 'rgb(178, 79, 126)',
          boxShadow: 'none',
          width: '100vw',
        }}
        open={open}
      >
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Link to='/'>
            <Typography
              variant='h6'
              noWrap
              component='div'
              sx={{ color: '#fff', fontSize: '48px', fontWeight: 700 }}
            >
              Your Preference
            </Typography>
          </Link>
          {/* 로그인 계정이 관리자인지 고객인지 확인 */}
          {location.pathname === '/' ? (
            <Box></Box>
          ) : getUser !== null || undefined ? (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box>
                {loginUserData &&
                  loginUserData.map(data =>
                    data.isAdmin ? (
                      <Box key={data.name}>{data.name} 관리자님, 어서오세요.</Box>
                    ) : (
                      <Box key={data.name}>{data.name} 고객님, 환영합니다.</Box>
                    )
                  )}
              </Box>
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
            </Box>
          ) : (
            <Link to='/login'>
              <Button sx={{ color: '#000' }}>Log-in</Button>
            </Link>
          )}

          <IconButton
            color='inherit'
            aria-label='open drawer'
            edge='end'
            onClick={handleDrawerOpen}
            sx={{ ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Drawer
            sx={{
              // width: drawerWidth,
              flexShrink: 0,
              '& .MuiDrawer-paper': {
                // width: drawerWidth,
              },
              ...(!open && { display: 'none' }),
            }}
            variant='persistent'
            anchor='right'
            open={open}
          >
            <DrawerHeader>
              <IconButton onClick={handleDrawerClose}>
                {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
              </IconButton>
            </DrawerHeader>
            <CartSide />
          </Drawer>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
