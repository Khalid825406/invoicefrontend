import React from 'react';
import { Route, Routes } from "react-router-dom";
import CompanyList from './CompanyList';
import CompanyDetail from './CompanyDetail';
import Navbar from './Navbar';
import { Container } from "@mui/material";
import Dashboard from './Dashboard';

function App() {
  return (
    <>
      <Navbar />
      <Container>
        <Routes>
          <Route path="/" element={<Dashboard/>} />
          <Route path="/company/:id" element={<CompanyDetail />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;