import { Box, Typography, Button, Container, TextField, Grid } from '@mui/material';
import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSuccess, setIsSucess] = useState(true);

  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    console.log('submit login');
    const data = new FormData(e.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
    // 로그인 요청 보내기
    try {
      const res = await axios.post('http://localhost:5000/login', {
        email: data.get('email'),
        password: data.get('password'),
      });
      console.log(res, '로그인 성공');
      // localStorage에 저장
      localStorage.setItem('email', email);
      localStorage.setItem('password', password);
      navigate('/cart');
      setIsSucess(true);

      console.log(isSuccess, 'isSucceess???');
    } catch (err) {
      console.error('서버 오류:', err);
      setIsSucess(false);
      if (err.response.status === 401) {
        console.error('401에러');
      } else if (err.response.status === 500) {
        console.error('로그인 실패');
      }
    }
  };

  return (
    <>
      <Container component='main' maxWidth='xs'>
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component='h1' variant='h5'>
            Login
          </Typography>
          <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin='normal'
              required
              fullWidth
              id='email'
              label='Email Address'
              name='email'
              autoComplete='email'
              autoFocus
              onChange={e => setEmail(e.target.value)}
            />
            <TextField
              margin='normal'
              required
              fullWidth
              name='password'
              label='Password'
              type='password'
              id='password'
              autoComplete='current-password'
              onChange={e => setPassword(e.target.value)}
            />
            {isSuccess === false && (
              <Box>
                <Typography sx={{ color: 'red' }}>
                  아이디 또는 비밀번호가 잘못되었습니다.
                </Typography>
              </Box>
            )}
            <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
              LogIn
            </Button>
            <Grid container>
              <Grid item>
                <Link to='/signup' variant='body2'>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default LoginForm;
