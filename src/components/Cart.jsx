import { Box, Button } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';

const Cart = () => {
  const [items, setItems] = useState([]);

  // 장바구니 아이템 불러오기
  useEffect(() => {
    const fetchItem = async () => {
      try {
        const res = await axios.get('http://localhost:5000/getItems');
        const data = res.data;
        setItems(data);
        console.log(data, 'data');
      } catch (error) {
        console.log(error, '아이템 불러오기 에러');
      }
    };
    fetchItem();
  }, []);

  // 장바구니 아이템 추가 함수
  const addItem = async e => {
    const newItem = e.target.previousElementSibling.textContent;
    try {
      const res = await axios.post('http://localhost:5000/postItems', { name: newItem });
      console.log(res, 'res');
      console.log(newItem);
      setItems([...items, res.data]);
      console.log(items, 'itemsssss');
    } catch (error) {
      console.log(error, '아이템 추가 에러');
    }
  };

  // 장바구니 아이템 삭제 함수
  const removeItem = async itemId => {
    try {
      await axios.delete(`http://localhost:5000/deleteItems/${itemId}`);

      // 배열 복사
      const updatedItems = [...items];
      // 삭제할 아이템id의 index추출
      const indexFind = updatedItems.findIndex((item, i) => item._id === itemId);
      console.log(indexFind, 'indexFind');
      // 추출한 index로 배열의splice를하여 아이템 삭제
      updatedItems.splice(indexFind, 1);
      // 상태 업데이트
      setItems(updatedItems);
      console.log(items, 'items');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', mb: '50px' }}>
        <Box
          sx={{
            bgcolor: '#aaa',
            // border: '5px solid skyblue',
            borderRadius: '10px',
            padding: '4px',
            width: '160px',
            marginRight: '5px',
          }}
        >
          <Box sx={{ fontSize: '40px', fontWeight: 'bold', color: '#fff', marginBottom: '5px' }}>
            fff
          </Box>
          <Button
            sx={{
              fontWeight: 'bold',
              fontSize: '18px',
              color: '#000',
              '&:hover': { color: 'blue' },
            }}
            onClick={e => addItem(e)}
          >
            추가
          </Button>
        </Box>
        <Box
          sx={{
            backgroundColor: '#aaa',
            // border: '5px solid skyblue',
            borderRadius: '10px',
            padding: '4px',
            width: '160px',
            marginRight: '5px',
          }}
        >
          <Box sx={{ fontSize: '40px', fontWeight: 'bold', color: '#fff', marginBottom: '5px' }}>
            ggg
          </Box>
          <Button
            sx={{
              fontWeight: 'bold',
              fontSize: '18px',
              color: '#000',
              '&:hover': { color: 'blue' },
            }}
            onClick={e => addItem(e)}
          >
            추가
          </Button>
        </Box>
        <Box
          sx={{
            backgroundColor: '#aaa',
            // border: '5px solid skyblue',
            borderRadius: '10px',
            padding: '4px',
            width: '160px',
          }}
        >
          <Box sx={{ fontSize: '40px', fontWeight: 'bold', color: '#fff', marginBottom: '5px' }}>
            hhh
          </Box>
          <Button
            sx={{
              fontWeight: 'bold',
              fontSize: '18px',
              color: '#000',
              '&:hover': { color: 'blue' },
            }}
            onClick={e => addItem(e)}
          >
            추가
          </Button>
        </Box>
      </Box>
      {/* 리스트 영역 */}
      <Box sx={{ display: 'flex', flexFlow: 'column nowrap' }}>
        {items.map((item, index) => (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              borderBottom: '1px solid #000',
            }}
            key={index}
          >
            <Box sx={{ flex: 3 }}>{item.name}</Box>
            <Button
              sx={{ flex: 1, '&:hover': { color: 'red' } }}
              onClick={() => removeItem(item._id)}
            >
              삭제
            </Button>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Cart;
