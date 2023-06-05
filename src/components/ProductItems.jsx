import { Box, Button, TextField } from '@mui/material';
import axios from 'axios';
import { useState } from 'react';

const ProductItem = ({ onProductAdded, setAddModalOpen }) => {
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productImage, setProductImage] = useState(null);

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('name', productName);
      formData.append('description', productDescription);
      formData.append('image', productImage);

      const response = await axios.post('http://localhost:5000/adminAddProduct', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      // 상품 추가 업데이트
      onProductAdded(response.data);

      // console.log(response.data, 'res.data');

      setProductName('');
      setProductDescription('');
      setProductImage(null);

      // setAddModalOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleImageChange = e => {
    setProductImage(e.target.files[0]);
  };
  // useEffect(() => {
  //   fetchGetAllProduct();
  // }, [fetchGetAllProduct]);
  return (
    <Box>
      <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          sx={{ mb: 1 }}
          required
          fullWidth
          id='name'
          label='Name'
          name='name'
          onChange={e => setProductName(e.target.value)}
        />
        <TextField
          sx={{ mb: 1 }}
          required
          fullWidth
          id='description'
          label='Description'
          name='description'
          onChange={e => setProductDescription(e.target.value)}
        />
        <TextField
          fullWidth
          id='image'
          // label='Image'
          name='image'
          type='file'
          onChange={handleImageChange}
        />
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button type='submit' variant='contained' sx={{ mt: 2, mr: 2 }}>
            상품 등록
          </Button>
          <Button onClick={() => setAddModalOpen(false)} variant='contained' sx={{ mt: 2 }}>
            취소
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ProductItem;
