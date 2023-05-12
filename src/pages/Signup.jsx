import { Box, Typography, Button } from '@mui/material';
import axios from 'axios';
import { useState } from 'react';

function SignupForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async event => {
    event.preventDefault();

    // 회원가입 요청 보내기
    try {
      const res = await axios.post('http://localhost:5000/signup', {
        name: name,
        email: email,
        password: password,
      });

      // TODO: response에 200이면,
      console.log(res, '회원가입 성공');
      // if (response.ok) {
      //   console.log('회원가입 성공');
      // } else {
      //   console.error('회원가입 실패');
      // }
    } catch (error) {
      console.error('서버 오류:', error);
    }
  };

  return (
    <div>
      <h1>회원가입</h1>
      <Box component='form' noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <label htmlFor='name'>이름:</label>
        <input
          type='text'
          id='name'
          value={name}
          onChange={event => setName(event.target.value)}
          required
        />

        <label htmlFor='email'>이메일:</label>
        <input
          type='email'
          id='email'
          value={email}
          onChange={event => setEmail(event.target.value)}
          required
        />

        <label htmlFor='password'>비밀번호:</label>
        <input
          type='password'
          id='password'
          value={password}
          onChange={event => setPassword(event.target.value)}
          required
        />
        <button type='submit'>가입하기</button>
      </Box>
    </div>
  );
}

export default SignupForm;
