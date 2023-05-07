import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActionArea,
  CardActions,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import { useEffect, useState } from 'react';
import products from './Products';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  // const [newItem, setNewItem] = useState({
  //   name: '',
  //   description: '',
  //   // price: '',
  // });

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

  // const handleInputChange = e => {
  //   setNewItem({ ...newItem, [e.target.name]: e.target.value });
  // };

  // 장바구니 아이템 추가 함수
  const addItem = async productName => {
    // const newItem = e.target.previousElementSibling.textContent;
    // console.log(newItem);
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

  // 장바구니 아이템 삭제 함수
  const removeItem = async itemId => {
    try {
      await axios.delete(`http://localhost:5000/deleteItems/${itemId}`);

      // 배열 복사
      const updatedItems = [...cartItems];
      // 삭제할 아이템id의 index추출
      const indexFind = updatedItems.findIndex(item => item._id === itemId);
      console.log(indexFind, 'indexFind');
      // 추출한 index로 배열의splice를하여 아이템 삭제
      updatedItems.splice(indexFind, 1);
      // 상태 업데이트
      setCartItems(updatedItems);
      console.log(cartItems, 'cartItems');
    } catch (err) {
      console.log(err);
    }
  };

  // 수량 증가
  const increaseNum = async itemId => {
    console.log(itemId, 'increase e');
    try {
      await axios.put(`http://localhost:5000/increase/${itemId}`);
      fetchItem();
    } catch (error) {
      console.log(error, '수량 증가 에러');
    }
  };

  // 수량 감소
  const decreaseNum = async itemId => {
    try {
      await axios.put(`http://localhost:5000/decrease/${itemId}`);
      fetchItem();
    } catch (error) {
      console.log(error, '수량 감소 에러');
    }
  };

  return (
    <Box
      sx={
        {
          // display: 'flex',
          // flexFlow: 'column nowrap',
          // justifyContent: 'space-between',
          // height: '900px',
          // padding: '10px',
          // bgcolor: 'rgb(178, 79, 126)',
        }
      }
    >
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
                <Button onClick={() => addItem(product.name)}>추가</Button>
              </CardActions>
            </Card>
          );
        })}
      </Box>

      {/* 리스트 영역 */}
      <List sx={{ bgcolor: '#fff', minWidth: 650 }}>
        {cartItems.map((item, index) => (
          <ListItem
            sx={{
              display: 'flex',
              borderBottom: '1px solid #000',
            }}
            key={index}
            secondaryAction={
              <IconButton edge='end' aria-label='delete' onClick={() => removeItem(item._id)}>
                <DeleteIcon />
              </IconButton>
            }
          >
            <ListItemText sx={{}}>{item.name}</ListItemText>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <ListItemButton onClick={() => decreaseNum(item._id)}>감소</ListItemButton>
              <Box>{item.quantity}</Box>
              <ListItemButton onClick={() => increaseNum(item._id)}>증가</ListItemButton>
            </Box>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Cart;
