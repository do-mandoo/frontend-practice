import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActionArea,
  CardActions,
  Container,
  Grid,
  Modal,
} from '@mui/material';

import axios from 'axios';
import { useEffect, useState } from 'react';
import Header from './Header';
import { Link, useNavigate } from 'react-router-dom';
import ProductItems from './ProductItems';

const drawerWidth = 440;

const MainListForm = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  // 슬라이드 카트 사이드바 열고/닫기
  const [cartSidebarOpen, setCartSidebarOpen] = useState(false);

  // 로그인한 계정
  const [loginUserData, setLoginUserData] = useState();

  // 상품추가 모달 열고/닫기
  const [addModalOpen, setAddModalOpen] = useState(false);
  const handleOpen = () => setAddModalOpen(true);
  const handleClose = () => setAddModalOpen(false);

  const getUser = localStorage.getItem('email');
  const navigate = useNavigate();

  // 랜더링 될 때, 모든 사용자 계정을 가져온다.
  useEffect(() => {
    const fetchGetAllUsers = async () => {
      const res = await axios.get('http://localhost:5000/getSignup');
      // 로그인한 계정의 데이터를 loginUserData에 저장.
      const mapfilter = res.data.filter(data => data.email === getUser);
      setLoginUserData(mapfilter);
      // console.log(loginUserData, '확인isAdmin???');
    };
    fetchGetAllUsers();
  }, []);

  useEffect(() => {
    fetchGetAllProduct();
    fetchGetCartItem();
    navigate;
  }, []);

  // 상품 아이템 불러오기
  const fetchGetAllProduct = async () => {
    try {
      const res = await axios.get('http://localhost:5000/getAllProduct');
      const data = res.data;

      setAllProducts(data);
    } catch (error) {
      console.log(error, '상품 전체 가져오기 에러');
    }
  };

  // 장바구니 아이템 불러오기
  const fetchGetCartItem = async () => {
    try {
      const res = await axios.get('http://localhost:5000/getItems');
      const data = res.data;
      setCartItems(data);
    } catch (error) {
      console.log(error, '아이템 불러오기 에러');
    }
  };

  // 장바구니 아이템 추가 함수
  const addItem = async productName => {
    try {
      const res = await axios.post('http://localhost:5000/postItems', { name: productName });
      fetchGetCartItem();
      setCartItems([...cartItems, res.data]);
    } catch (error) {
      console.log(error, '아이템 추가 에러');
    }
  };

  // 장바구니 아이템 삭제 함수
  const removeProduct = async itemId => {
    try {
      await axios.delete(`http://localhost:5000/deleteProducts/${itemId}`);

      // 배열 복사
      const updatedItems = [...allProducts];
      // 삭제할 아이템id의 index추출
      const indexFind = updatedItems.findIndex(item => item._id === itemId);
      // console.log(indexFind, 'indexFind');
      // 추출한 index로 배열의splice를하여 아이템 삭제
      updatedItems.splice(indexFind, 1);
      // 상태 업데이트
      setAllProducts(updatedItems);
    } catch (err) {
      console.log(err);
    }
  };

  const handleProductAdded = newProduct => {
    // 기존의 상품 리스트에 새로운 상품 추가
    setAllProducts(prevProducts => [...prevProducts, newProduct]);
    setAddModalOpen(false); // 모달을 닫기
  };

  // 로그인이 안되어있다면 index페이지로 이동
  if (getUser === null || undefined) {
    return navigate('/');
  }

  return (
    <>
      <Box sx={{ minHeight: '100vh' }}>
        <Header
          open={cartSidebarOpen}
          setOpen={setCartSidebarOpen}
          cartItems={cartItems}
          setCartItems={setCartItems}
        />
        <Box
          sx={{
            mt: '40px',
            display: 'flex',
            flexFlow: 'column nowrap',
            justifyContent: 'center',
            alignItems: 'center',
            ...(cartSidebarOpen && {
              width: `calc(100% - ${drawerWidth}px)`,
            }),
          }}
          open={cartSidebarOpen}
        >
          <Typography
            variant='h3'
            sx={{
              color: 'rgb(178, 79, 126)',
              fontFamily: 'Ubuntu',
              fontWeight: 700,
              mb: '40px',
            }}
          >
            Product Item
          </Typography>
          <Container sx={{ py: 2, position: 'relative' }} maxWidth='md'>
            <Box>
              {loginUserData &&
                loginUserData.map(data =>
                  data.isAdmin ? (
                    <Button
                      key={data.name}
                      sx={{
                        position: 'absolute',
                        right: '30px',
                        top: '-30px',
                      }}
                      onClick={handleOpen}
                    >
                      추가
                    </Button>
                  ) : (
                    <Box key={data.name}></Box>
                  )
                )}

              <Modal
                open={addModalOpen}
                onClose={handleClose}
                aria-labelledby='modal-modal-title'
                aria-describedby='modal-modal-description'
              >
                <Box
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    border: '2px solid #000',
                    boxShadow: 24,
                    p: 4,
                  }}
                >
                  <ProductItems
                    onProductAdded={handleProductAdded}
                    setAddModalOpen={setAddModalOpen}
                  />
                </Box>
              </Modal>
            </Box>
            <Grid container spacing={4}>
              {allProducts.length ? (
                allProducts.map((product, index) => {
                  const imgUrl = product.image.split('\\')[8];
                  return (
                    <Grid item key={index} xs={12} sm={6} md={4}>
                      <Card
                        sx={{ width: '100%', mr: '10px', display: 'flex', flexDirection: 'column' }}
                      >
                        <CardActionArea>
                          <CardMedia
                            component='img'
                            height='140'
                            src={`http://localhost:5000/uploads/${imgUrl}`}
                            alt='product_image'
                          />
                          <CardContent>
                            <Typography component='div' gutterBottom variant='h5'>
                              {product.name}
                            </Typography>
                            <Typography variant='body2'>{product.description}</Typography>
                          </CardContent>
                        </CardActionArea>
                        <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
                          <Button onClick={() => addItem(product.name)}>담기</Button>
                          <>
                            {loginUserData &&
                              loginUserData.map(data =>
                                data.isAdmin ? (
                                  <Box key={data.name}>
                                    <Link to={`/modiItem/` + product._id}>
                                      <Button
                                        type='submit'
                                        variant='contained'
                                        sx={{
                                          bgcolor: 'unset',
                                          boxShadow: 'unset',
                                          color: 'rgb(25, 118, 210)',
                                          '&:hover': {
                                            bgcolor: 'unset',
                                            boxShadow: 'unset',
                                            textDecoration: 'none',
                                            backgroundColor: 'rgba(25, 118, 210, 0.04)',
                                            borderColor: '#646cff',
                                          },
                                        }}
                                      >
                                        수정
                                      </Button>
                                    </Link>
                                    <Button onClick={() => removeProduct(product._id)}>삭제</Button>
                                  </Box>
                                ) : (
                                  <Box key={data.name}></Box>
                                )
                              )}
                          </>
                        </CardActions>
                      </Card>
                    </Grid>
                  );
                })
              ) : (
                <Box>상품이 없습니다. 추가 버튼을 클릭하여 상품을 추가하세요.</Box>
              )}
            </Grid>
          </Container>
        </Box>
      </Box>
    </>
  );
};

export default MainListForm;
