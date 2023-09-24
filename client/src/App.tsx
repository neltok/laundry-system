import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation, } from 'react-router-dom';
import LoginComponent from './components/Login';
import { ChakraProvider } from '@chakra-ui/react';
import SignUp from './components/SignUp';
import Sidebar from './components/Sidebar/Sidebar';
import { ProductsTable } from './components/ProductsTable';
import NewServiceForm from './components/Forms/NewServiceForm';

function App() {
  const location = useLocation();

  return (
    <ChakraProvider>
        <Routes>
      {/* <Router> */}
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<LoginComponent />} />
          <Route path="/service/create" element={<Sidebar><NewServiceForm /></Sidebar>} />
          {/* <Route path="/product/view" element={<Sidebar><ProductSimple /></Sidebar>} /> */}
          {/* <Route path="/product/list" element={<Sidebar><ProductsTable /></Sidebar>} />
          <Route path="/review/list" element={<Sidebar><ReviewTable /></Sidebar>} /> */}
          <Route path="/" element={<Sidebar><ProductsTable /></Sidebar>} />
      {/* </Router> */}
        </Routes>
      {/* <Routes>
        <Route path="/signup" Component={SignUp} />
        <Route path="/login" Component={LoginComponent} />
        <Route path="/product/view">
          <Sidebar>
            <ProductSimple />
          </Sidebar>
        </Route>
        <Route path="/product/create">
          <Sidebar>
            <CreateProductForm />
          </Sidebar>
        </Route>
        <Route path="/product/list">
          <Sidebar>
            <ListProducts />
          </Sidebar>
        </Route>
      </Routes> */}
    </ChakraProvider >
  );
}

export default App;
