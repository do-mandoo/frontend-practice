import { Box, Container, TextField, Typography, Button } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import Header from './Header';

const UserInfo = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  console.log(id, 'id??');

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState(id);
  const [passwordConfirm, setPasswordConfirm] = useState('');

  useEffect(() => {
    const fetchGetUser = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/profile/${id}`);
        const data = res.data;
        // setEmail(data.email);
        // setPassword(data.password);
        setName(data.name);
        console.log(data, 'res-data');
      } catch (error) {
        console.log(error, '사용자 불러오기 에러');
      }
    };
    fetchGetUser();
  }, []);

  const formSchema = Yup.object().shape({
    name: Yup.string().required('이름을 입력해주세요.'),
    // email: Yup.string().('이메일을 입력해 주세요').email('이메일 형식이 아닙니다.'),
    password: Yup.string().required('영문, 숫자포함 8자리를 입력해주세요.'),
    // .min(8, '최소 8자 이상 가능합니다')
    // .max(15, '최대 15자 까지만 가능합니다')
    // .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,15}$/, '영문 숫자포함 8자리를 입력해주세요.'),
    passwordConfirm: Yup.string().oneOf([Yup.ref('password')], '비밀번호가 다릅니다.'),
  });

  const formik = useFormik({
    initialValues: {
      name: name,
      password: password,
      email: email,
      passwordConfirm: passwordConfirm,
    },
    onSubmit: async values => {
      console.log(values, 'formik Values!');
      try {
        const res = await axios.post(`http://localhost:5000/userInfoUpdate/${id}`, {
          name: values.name,
          password: values.password,
          email: email,
        });
        console.log(res, 'resskaoijod');
        if (res.status === 201) {
          navigate('/main');
        }
      } catch (error) {
        console.error(error);
      }
    },
    validationSchema: formSchema,
  });

  return (
    <Box sx={{ width: '100vw', height: '100vh', margin: '0 auto' }}>
      <Header />
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
            회원정보 수정
          </Typography>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              margin='normal'
              required
              fullWidth
              id='name'
              label={name}
              name='name'
              // autoFocus
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
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
              // onChange={e => setEmail(e.target.value)}
              // onChange={formik.handleChange}
              // onBlur={formik.handleBlur}
            />
            <TextField
              margin='normal'
              required
              fullWidth
              id='password'
              label='비밀번호'
              type='password'
              name='password'
              autoComplete='current-password'
              // onChange={e => setPassword(e.target.value)}
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <TextField
              margin='normal'
              required
              fullWidth
              id='passwordConfirm'
              label='비밀번호 확인'
              type='password'
              name='passwordConfirm'
              // onChange={e => setPasswordConfirm(e.target.value)}
              value={formik.values.passwordConfirm}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
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
          </form>
        </Box>
      </Container>
    </Box>
  );
};

export default UserInfo;
