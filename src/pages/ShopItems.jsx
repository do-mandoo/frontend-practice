import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActionArea,
  CardActions,
} from '@mui/material';

import axios from 'axios';
import { useEffect, useState } from 'react';
import products from '../components/Products';
import Header from './Header';
import { useNavigate } from 'react-router-dom';

const drawerWidth = 440;

const CartForm = () => {
  const [cartItems, setCartItems] = useState([]);

  // 슬라이드 카트 바 열고/닫기
  const [open, setOpen] = useState(false);

  // 장바구니 아이템 불러오기
  useEffect(() => {
    fetchItem();
  }, []);

  const fetchItem = async () => {
    try {
      const res = await axios.get('http://localhost:5000/getItems');
      const data = res.data;
      setCartItems(data);
      console.log(data, 'data');
    } catch (error) {
      console.log(error, '아이템 불러오기 에러');
    }
  };

  // 장바구니 아이템 추가 함수
  const addItem = async productName => {
    try {
      const res = await axios.post('http://localhost:5000/postItems', { name: productName });
      console.log(res, 'res');
      fetchItem();
      setCartItems([...cartItems, res.data]);
      console.log(cartItems, 'itemsssss');
    } catch (error) {
      console.log(error, '아이템 추가 에러');
    }
  };

  const getUser = localStorage.getItem('email');
  const navigate = useNavigate();

  if (getUser === null || undefined) {
    return navigate('/');
  }

  return (
    <>
      <Box sx={{ minHeight: '100vh' }}>
        <Header open={open} setOpen={setOpen} />
        <Box
          sx={{
            mt: '40px',
            display: 'flex',
            flexFlow: 'column nowrap',
            justifyContent: 'center',
            alignItems: 'center',
            ...(open && {
              width: `calc(100% - ${drawerWidth}px)`,
            }),
          }}
          open={open}
        >
          {/* <Box sx={{}}> */}
          <Typography
            variant='h3'
            sx={{
              // display: 'flex',
              // justifyContent: 'center',
              color: 'rgb(178, 79, 126)',
              fontFamily: 'Ubuntu',
              fontWeight: 700,
            }}
          >
            Product Item
          </Typography>
          {/* </Box> */}
          <Box sx={{ display: 'flex', mb: '40px' }}>
            {products.map(product => {
              return (
                <Card key={product._id} sx={{ maxWidth: 345, mr: '10px' }}>
                  <CardActionArea>
                    <CardMedia
                      component='img'
                      height='140'
                      image={product.image}
                      alt='pengsoo-flowes'
                    />
                    <CardContent>
                      <Typography component='div' gutterBottom variant='h5'>
                        {product.name}
                      </Typography>
                      <Typography variant='body2'>{product.description}</Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Button onClick={() => addItem(product.name)}>담기</Button>
                  </CardActions>
                </Card>
              );
            })}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default CartForm;
