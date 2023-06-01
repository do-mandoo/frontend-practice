import { Box, Button, TextField } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const ModiItem = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [productItem, setProductItem] = useState({});

  const [productModiName, setProductModiName] = useState('');
  const [productModiDescription, setProductModiDescription] = useState('');
  const [productModiImage, setProductModiImage] = useState(null);

  useEffect(() => {
    const fetchGetItem = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/product/${id}`);
        setProductItem(res.data);
      } catch (error) {
        console.log(error, 'error');
      }
    };
    fetchGetItem();
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const formData = new FormData();

      formData.append('name', productModiName);
      formData.append('description', productModiDescription);
      formData.append('image', productModiImage);

      await axios.put(`http://localhost:5000/updateProduct/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      navigate('/main');
    } catch (error) {
      console.error(error);
    }
  };

  const handleImageChange = e => {
    setProductModiImage(e.target.files[0]);
  };

  return (
    <Box>
      <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          sx={{ mb: 1 }}
          required
          fullWidth
          id='name'
          label={productItem ? productItem.name : ''}
          name='name'
          onChange={e => setProductModiName(e.target.value)}
        />
        <TextField
          sx={{ mb: 1 }}
          required
          fullWidth
          id='description'
          label={productItem ? productItem.description : ''}
          name='description'
          onChange={e => setProductModiDescription(e.target.value)}
        />
        <TextField
          fullWidth
          id='image'
          label={productItem ? productItem.image?.split('\\')[8] : ''}
          name='image'
          type='file'
          onChange={handleImageChange}
        />
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button type='submit' variant='contained' sx={{ mt: 2, mr: 2 }}>
            수정
          </Button>
          <Button
            onClick={() => {
              navigate(-1); // 뒤로가기
            }}
            variant='contained'
            sx={{ mt: 2 }}
          >
            취소
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ModiItem;
