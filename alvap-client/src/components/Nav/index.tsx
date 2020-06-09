import React from 'react';
import styled from '@emotion/styled';
import Burger from './Burger';
import { Link } from 'react-router-dom';

const Nav = styled.nav({
  width: '100%',
  height: 'auto',
  borderBottom: '2px solid #f1f1f1',
  padding: '0 20px',
  display: 'flex',
  justifyContent: 'space-between',
  zIndex: 10,
});

const Name = styled.div({
  padding: '15px 0',
});

const Navbar: React.FunctionComponent = () => (
  <Nav>
    <Link to="/tienda" style={{ color: '#111', fontSize: '2.5rem' }}>
      <Name className="title">ALVAP</Name>
    </Link>
    <Burger />
  </Nav>
);

export default Navbar;
