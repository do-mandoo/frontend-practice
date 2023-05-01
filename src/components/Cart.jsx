import axios from 'axios';
import { useEffect, useState } from 'react';

const Cart = () => {
  const [items, setItems] = useState([]);
  // const [name, setName] = useState('');

  // 장바구니 아이템 불러오기
  useEffect(() => {
    const getItem = async () => {
      const res = await axios.get('http://localhost:5000/items');
      const data = res.data;
      // setItems(data)
      console.log(data, 'data');
    };
    getItem();
  }, []);

  // 장바구니 아이템 추가 함수
  const addItem = e => {
    // console.log(e.target.previousElementSibling.textContent, 'hi');
    const newItem = e.target.previousElementSibling.textContent;
    // setItems([...items, newItem]);
    // console.log(items, 'items');
    // // setName('');
    axios
      .post('http://localhost:5000/items', newItem)
      .then(res => {
        setItems([...items, res.data]);
      })
      .catch(err => {
        console.log(err, '아이템 추가 에러');
      });
  };

  // 장바구니 아이템 삭제 함수
  const removeItem = index => {
    const updatedItems = items.filter((item, i) => i !== index);
    setItems(updatedItems);
  };

  return (
    <div>
      <ul style={{ width: '200px' }}>
        {items &&
          items.map((item, index) => (
            <li key={index}>
              {item} <button onClick={() => removeItem(index)}>삭제</button>
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
            Clothes
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
            Pants
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
            Hat
          </div>
          <button onClick={e => addItem(e)}>추가</button>
          {/* <button>삭제</button> */}
        </div>
      </div>
    </div>
  );
};

export default Cart;
