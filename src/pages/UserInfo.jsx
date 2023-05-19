import { Box, Container, TextField, Typography, Button } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const UserInfo = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchGetUser = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/profile/${id}`);
        const data = res.data;
        setEmail(data.email);
        // setPassword(data.password);
        setName(data.name);
        console.log(data, 'res-data');
      } catch (error) {
        console.log(error, '사용자 불러오기 에러');
      }
    };
    fetchGetUser();
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post(`http://localhost:5000/userInfoUpdate/${id}`, {
        name: name,
        password: password,
      });
      console.log(res, 'resskaoijod');
      if (res.status === 201) {
        navigate('/cart');
      }
    } catch (error) {
      console.error(error);
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
            Modify User Info
          </Typography>
          <Box component='form' noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin='normal'
              required
              fullWidth
              id='name'
              label={name}
              name='name'
              // autoFocus
              defaultValue={name}
              onChange={e => setName(e.target.value)}
            />
            <TextField
              disabled
              margin='normal'
              required
              fullWidth
              id='email'
              label={email}
              name='email'
              autoComplete='email'
              // autoFocus
              defaultValue={email}
              onChange={e => setEmail(e.target.value)}
            />
            <TextField
              margin='normal'
              required
              fullWidth
              id='password'
              label='User Password'
              name='password'
              autoComplete='current-password'
              onChange={e => setPassword(e.target.value)}
            />
            <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
              수정
            </Button>
            <Button
              fullWidth
              variant='contained'
              onClick={() => {
                navigate(-1); // 뒤로가기
              }}
            >
              취소
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default UserInfo;
