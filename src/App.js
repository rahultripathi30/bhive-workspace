import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchCenters } from './redux/centersSlice';
import CentersOverview from './components/CentersOverview';
import Header from './components/Header';
import Footer from './components/Footer';
import { Container } from '@mui/material';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCenters());
  }, [dispatch]);

  return (
    <Container>
      <Header />
      <CentersOverview />
      <Footer />
    </Container>
  );
};

export default App;
