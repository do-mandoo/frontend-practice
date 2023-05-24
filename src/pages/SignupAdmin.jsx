import { Box, Typography, Button, Grid, TextField, Container } from '@mui/material';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Header from './Header';

const SignupAdminForm = () => {
  const navigate = useNavigate();

  const handleSubmit = async event => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      name: data.get('name'),
      email: data.get('email'),
      password: data.get('password'),
    });

    // 회원가입 요청 보내기
    try {
      const res = await axios.post('http://localhost:5000/signupAdmin', {
        name: data.get('name'),
        email: data.get('email'),
        password: data.get('password'),
        isAdmin: true,
      });

      console.log(res, '회원가입 성공');
      if (res.status === 201 || res.data.success === true) {
        console.log('회원가입 성공');
        navigate('/login');
      } else {
        console.error('회원가입 실패');
      }
    } catch (error) {
      console.error('서버 오류:', error);
    }
  };

  return (
    <Box sx={{ width: '100vw', height: '100vh', margin: '0 auto' }}>
      <Header />
      <Container component='main' maxWidth='xs' sx={{ margin: 'auto' }}>
        <Typography component='h1' variant='h5'>
          Sign up Admin
        </Typography>
        <Box component='form' noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            {/* <Grid item xs={12} sm={6}>
              <TextField
                autoComplete='given-name'
                name='firstName'
                required
                fullWidth
                id='firstName'
                label='First Name'
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id='lastName'
                label='Last Name'
                name='lastName'
                autoComplete='family-name'
              />
            </Grid> */}
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id='name'
                label='Name'
                name='name'
                autoComplete='full-name'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id='email'
                label='Email Address'
                name='email'
                autoComplete='email'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name='password'
                label='Password'
                type='password'
                id='password'
                autoComplete='new-password'
              />
            </Grid>
          </Grid>
          <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
            Sign Up Admin
          </Button>
          <Grid container justifyContent='flex-end'>
            <Grid item>
              <Link to='/login' variant='body2'>
                Already have an account? Login
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default SignupAdminForm;
