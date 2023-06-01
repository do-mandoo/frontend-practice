/* eslint-disable react/prop-types */
import {
  Box,
  // Button,
  Divider,
  // Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';

const CartSide = ({ items, setItems }) => {
  console.log(items, 'itmesssssssss');
  // const [cartItems, setItems] = useState([items]);

  // // 장바구니 아이템 불러오기
  // useEffect(() => {
  //   fetchItem();
  // }, []);

  // const fetchItem = async () => {
  //   try {
  //     const res = await axios.get('http://localhost:5000/getItems');
  //     const data = res.data;
  //     setCartItems(data);
  //     // setItem(prevItem => [...prevItem, data]);
  //     // console.log(data, 'data');
  //   } catch (error) {
  //     console.log(error, '아이템 불러오기 에러');
  //   }
  // };

  // 장바구니 아이템 삭제 함수
  const removeItem = async itemId => {
    try {
      await axios.delete(`http://localhost:5000/deleteItems/${itemId}`);

      // 배열 복사
      const updatedItems = [...items];
      // 삭제할 아이템id의 index추출
      const indexFind = updatedItems.findIndex(item => item._id === itemId);
      // console.log(indexFind, 'indexFind');
      // 추출한 index로 배열의splice를하여 아이템 삭제
      updatedItems.splice(indexFind, 1);
      // 상태 업데이트
      setItems(updatedItems);
      // console.log(cartItems, 'cartItems');
    } catch (err) {
      console.log(err);
    }
  };

  // 수량 증가
  const increaseNum = async itemId => {
    try {
      await axios.put(`http://localhost:5000/increase/${itemId}`);
      setItems();
    } catch (error) {
      console.log(error, '수량 증가 에러');
    }
  };

  // 수량 감소
  const decreaseNum = async itemId => {
    try {
      await axios.put(`http://localhost:5000/decrease/${itemId}`);
      setItems();
    } catch (error) {
      console.log(error, '수량 감소 에러');
    }
  };

  // const handleCartAdded = newItem => {
  //   // 기존의 상품 리스트에 새로운 상품 추가
  //   setCartItems(prevItem => [...prevItem, newItem]);
  // };

  return (
    <Box>
      <Box>
        <Typography
          variant='h3'
          sx={{
            color: 'rgb(178, 79, 126)',
            mt: '20px',
            fontFamily: 'Ubuntu',
            fontWeight: 700,
          }}
        >
          Cart Item
        </Typography>
      </Box>
      <Divider />
      <List sx={{ bgcolor: '#fff', minWidth: 400 }}>
        {items &&
          items.map((item, index) => (
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

export default CartSide;
