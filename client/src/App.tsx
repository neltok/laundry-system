import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation, } from 'react-router-dom';
import LoginComponent from './components/Login';
import { ChakraProvider } from '@chakra-ui/react';
import SignUp from './components/SignUp';
import Sidebar from './components/Sidebar';
import ProductSimple from './components/Product';
import CreateProduct from './components/CreateProduct'
import { ListProducts } from './components/ListProducts';
// import ProductList from './components/ProductList';
// import ReviewList from './components/ReviewList';
// import CreateProduct from './components/CreateProduct';
// import CreateReview from './components/CreateReview';

function App() {
  const location = useLocation();

  // Comprueba si la ruta actual es la ruta de inicio de sesión
  const isLoginRoute = location.pathname === '/login' || location.pathname === '/signup';

  return (
    <ChakraProvider>
        {!isLoginRoute && <Sidebar children={
          <Routes>
            <Route path="/" Component={ProductSimple} />
            <Route path="/product/create" Component={CreateProduct} />
            <Route path="/product/list" Component={ListProducts} />
          </Routes>
        } />}
      <Routes>
        <Route path="/signup" Component={SignUp} />
        <Route path="/login" Component={LoginComponent} />
      </Routes>
    </ChakraProvider >
  );
}

export default App;
