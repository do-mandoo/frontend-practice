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

    // setItems([...items, newItem]);
    // console.log(items, 'items');
    // setName('');
    //---
    // axios
    //   .post('http://localhost:5000/items', { name: newItem })
    //   .then(res => {
    //     setItems([...items, res.data]);
    //   })
    //   .catch(err => {
    //     console.log(err, '아이템 추가 에러');
    //   });
    // const newItem = 'pat';

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
  const removeItem = async index => {
    // const updatedItems = items.filter((item, i) => i !== index);
    // setItems(updatedItems);
    try {
      await axios.delete(`http://localhost:5000/deleteItems/${index}`);
      const updatedItems = [...items];
      updatedItems.splice(index, 1);
      setItems(updatedItems);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <ul style={{ width: '200px' }}>
        {items.map((item, index) => (
          <li key={index}>
            {item.name} <button onClick={() => removeItem(item._id)}>삭제</button>
          </li>
        ))}
      </ul>
      <div style={{ display: 'flex' }}>
        <div
          style={{
            backgroundColor: '#aaa',
            border: '5px solid skyblue',
            borderRadius: '10px',
            padding: '4px',
            width: '160px',
            marginRight: '5px',
          }}
        >
          <div style={{ fontSize: '40px', fontWeight: 'bold', color: '#fff', marginBottom: '5px' }}>
            fff
          </div>
          <button onClick={e => addItem(e)}>추가</button>
          {/* <button>삭제</button> */}
        </div>
        <div
          style={{
            backgroundColor: '#aaa',
            border: '5px solid skyblue',
            borderRadius: '10px',
            padding: '4px',
            width: '160px',
            marginRight: '5px',
          }}
        >
          <div style={{ fontSize: '40px', fontWeight: 'bold', color: '#fff', marginBottom: '5px' }}>
            ggg
          </div>
          <button onClick={e => addItem(e)}>추가</button>
          {/* <button>삭제</button> */}
        </div>
        <div
          style={{
            backgroundColor: '#aaa',
            border: '5px solid skyblue',
            borderRadius: '10px',
            padding: '4px',
            width: '160px',
          }}
        >
          <div style={{ fontSize: '40px', fontWeight: 'bold', color: '#fff', marginBottom: '5px' }}>
            hhh
          </div>
          <button onClick={e => addItem(e)}>추가</button>
          {/* <button>삭제</button> */}
        </div>
      </div>
    </div>
  );
};

export default Cart;
