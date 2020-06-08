import React from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

interface UlProps {
  open: boolean;
}

const Ul = styled.ul<UlProps>`
  @import url('https://fonts.googleapis.com/css2?family=Work+Sans&display=swap');

  list-style: none;
  display: flex;
  flex-flow: row nowrap;
  z-index: 10;

  li {
    padding: 10px;
  }

  a {
    color: rgba(0, 0, 0, 0.87);
    font-family: 'Work Sans', sans-serif;
  }
  a:hover {
    color: #afb6b6;
  }

  @media (max-width: 760px) {
    transform: ${({ open }) => (open ? 'translateX(0)' : 'translateX(100%)')};
    flex-flow: column nowrap;
    background-color: #008079;
    position: fixed;
    top: 0;
    right: 0;
    height: 150vh;
    width: 80vw;
    padding-top: 10vh;
    margin-top: 0;
    margin-bottom: 0;
    padding-left: 0;
    transition: transform 0.3s ease-in-out;

    li {
      color: white;
      width: 100%;
      padding-right: 12.5%;
      padding-top: 3.5vh;
      padding-bottom: 3.5vh;
      font-size: 1.71428571rem;
      height: auto;
      display: inline-block;
      vertical-align: middle;
      line-height: normal;
      text-align: right;
    }
    li:hover {
      background-color: #004d49;
    }
    a {
      color: white;
    }
    a:hover {
      color: white;
    }
  }
`;

interface MenuProps extends UlProps {
  onClick: () => void;
}

const Menu: React.FunctionComponent<MenuProps> = ({ open, onClick }) => (
  <Ul open={open}>
    <Link to="/tienda">
      <li onClick={onClick}>Tienda</li>
    </Link>
    <Link to="/nosotros">
      <li onClick={onClick}>Nosotros</li>
    </Link>
    <Link to="/login">
      <li onClick={onClick}>Login</li>
    </Link>
    <Link to="/cupones">
      <li onClick={onClick}>Cupones</li>
    </Link>
    <li onClick={onClick}>Órdenes</li>
  </Ul>
);

export default Menu;
