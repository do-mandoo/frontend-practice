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
  // Modal,
  // Typography,
} from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';

// const style = {
//   position: 'absolute',
//   top: '0%',
//   right: '0%',
//   // transform: "translate(-50%, -50%)",
//   width: 400,
//   height: '100%',
//   bgcolor: 'background.paper',
//   border: '2px solid #000',
//   boxShadow: 24,
//   p: 4,
// };

const CartSide = () => {
  // const handleOpen = () => setIsOpen(true);
  // const handleClose = () => setIsOpen(false);
  // const [state, setState] = useState({
  //   top: false,
  //   left: false,
  //   bottom: false,
  //   right: false,
  // });

  const [cartItems, setCartItems] = useState([]);
  // const toggleDrawer = (anchor, open) => event => {
  //   if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
  //     return;
  //   }
  //   setState({ ...state, [anchor]: open });
  // };

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

  // const list = anchor => (
  //   <Box
  //     role='presentation'
  //     onClick={toggleDrawer(anchor, false)}
  //     onKeyDown={toggleDrawer(anchor, false)}
  //   ></Box>
  // );

  return (
    // <Box>
    //   {/* <Button onClick={handleOpen}>Open modal</Button>
    //   <Modal
    //     isOpen={isOpen}
    //     onClose={handleClose}
    //     aria-labelledby='modal-modal-title'
    //     aria-describedby='modal-modal-description'
    //   >
    //     <Box sx={style}>
    //       <Typography id='modal-modal-title' variant='h6' component='h2'>
    //         Text in a modal
    //       </Typography>
    //       <Typography id='modal-modal-description' sx={{ mt: 2 }}>
    //         Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
    //       </Typography>
    //     </Box>
    //   </Modal> */}

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

export default CartSide;
